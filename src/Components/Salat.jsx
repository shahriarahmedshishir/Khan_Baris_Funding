import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as Tone from 'tone';
import "../App.css";
// Helper function to parse time string (HH:mm) from the API to a Date object for today
const parseApiTime = (timeString, baseDate = new Date()) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date(baseDate);
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    return date;
};

// Helper function to format a Date object into a readable time string (e.g., 04:07 AM)
const formatToAmPm = (date) => {
    if (!date || !(date instanceof Date)) return '...';
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

// --- 3D Icon Component ---
const PrayerIcon = ({ prayerName }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;
        
        // Store the current mount node to use in the cleanup function
        const mountNode = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(40, 40);
        mountNode.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);
        camera.position.z = 2;

        let mesh, stars;
        const materialOptions = { emissiveIntensity: 0.4, flatShading: true };

        switch (prayerName) {
            case 'Fajr':
                mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), new THREE.MeshStandardMaterial({ ...materialOptions, color: 0xffe0b2, emissive: 0xffcc80 }));
                break;
            case 'Dhuhr':
                mesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.9), new THREE.MeshStandardMaterial({ ...materialOptions, color: 0xffee58, emissive: 0xffff00 }));
                break;
            case 'Asr':
                mesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), new THREE.MeshStandardMaterial({ ...materialOptions, color: 0xffa726, emissive: 0xff8f00 }));
                break;
            case 'Maghrib':
                mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), new THREE.MeshStandardMaterial({ ...materialOptions, color: 0xe57373, emissive: 0xff5252 }));
                break;
            case 'Isha':
                mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), new THREE.MeshStandardMaterial({ color: 0x263238 }));
                const starGeometry = new THREE.BufferGeometry();
                const starVertices = [];
                for (let i = 0; i < 200; i++) {
                    const x = (Math.random() - 0.5) * 10;
                    const y = (Math.random() - 0.5) * 10;
                    const z = (Math.random() - 0.5) * 10;
                    starVertices.push(x, y, z);
                }
                starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
                stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 }));
                scene.add(stars);
                break;
            default:
                mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xffffff }));
        }
        scene.add(mesh);

        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            mesh.rotation.y += 0.005;
            if (stars) stars.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup function
        return () => {
            cancelAnimationFrame(animationFrameId);
            // Use the stored mountNode for cleanup
            if (mountNode && renderer.domElement) {
                mountNode.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [prayerName]);

    return <div ref={mountRef} style={{ width: '40px', height: '40px' }} />;
};

// --- Main Salat Component ---
const Salat = () => {
    const [prayerTimes, setPrayerTimes] = useState([]);
    const [nextPrayer, setNextPrayer] = useState(null);
    const [timeToNextPrayer, setTimeToNextPrayer] = useState('');
    const [now, setNow] = useState(new Date());
    const [currentDateString, setCurrentDateString] = useState(new Date().toDateString());
    const [loading, setLoading] = useState('Getting location...');
    const [error, setError] = useState(null);
    const [location, setLocation] = useState({ city: 'Dhaka', country: 'Bangladesh' });
    const [hijriDate, setHijriDate] = useState('');
    const [soundEnabled, setSoundEnabled] = useState(false);
    const synth = useRef(null);
    const previousPrayerRef = useRef();

    // Initialize sound synthesizer
    useEffect(() => {
        synth.current = new Tone.Synth().toDestination();
    }, []);

    // Effect for location and fetching data. Re-runs when the date changes.
    useEffect(() => {
        const fetchPrayerTimes = async (url) => {
            setLoading('Fetching prayer times...');
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch prayer times. Check your connection.');
                const data = await response.json();
                
                if (data.code !== 200) throw new Error(data.data || 'Could not fetch prayer times.');

                const timings = data.data.timings;
                
                if (data.data.meta.timezone) {
                     const locationParts = data.data.meta.timezone.split('/');
                     setLocation({city: locationParts[1]?.replace(/_/g, " ") || 'Unknown', country: locationParts[0]});
                }

                const hijri = data.data.date.hijri;
                setHijriDate(`${hijri.weekday.en} ${hijri.day} ${hijri.month.en}, ${hijri.year}`);

                const prayerData = [
                    { name: 'Fajr', arabic: 'الفجر', time: timings.Fajr },
                    { name: 'Dhuhr', arabic: 'الظهر', time: timings.Dhuhr },
                    { name: 'Asr', arabic: 'العصر', time: timings.Asr },
                    { name: 'Maghrib', arabic: 'المغرب', time: timings.Maghrib },
                    { name: 'Isha', arabic: 'العشاء', time: timings.Isha },
                ];

                const today = new Date();
                const parsedPrayers = prayerData.map(p => ({ ...p, date: parseApiTime(p.time, today) }));

                const processedPrayers = parsedPrayers.map((prayer, index) => {
                    const nextPrayerIndex = (index + 1) % parsedPrayers.length;
                    const nextPrayerInfo = parsedPrayers[nextPrayerIndex];
                    let endTime = new Date(nextPrayerInfo.date);
                    if (nextPrayerInfo.name === 'Fajr') {
                        endTime.setDate(endTime.getDate() + 1);
                    }
                    return { ...prayer, startTime: prayer.date, endTime };
                });
                
                // Sort prayers by time and set state
                setPrayerTimes(processedPrayers.sort((a, b) => a.startTime - b.startTime));

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(null);
            }
        };

        const fetchWithCoordinates = (lat, lon) => {
            fetchPrayerTimes(`https://api.aladhan.com/v1/timings/${currentDateString}?latitude=${lat}&longitude=${lon}&method=5`);
        };

        const fetchWithCity = () => {
             fetchPrayerTimes(`https://api.aladhan.com/v1/timingsByCity/${currentDateString}?city=${location.city}&country=${location.country}&method=5`);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => fetchWithCoordinates(position.coords.latitude, position.coords.longitude),
                (err) => {
                    console.warn(`Geolocation error (${err.code}): ${err.message}`);
                    setError('Could not get location. Showing times for Dhaka.');
                    fetchWithCity();
                }
            );
        } else {
            setError('Geolocation not supported. Showing times for Dhaka.');
            fetchWithCity();
        }
    }, [currentDateString]); // Re-fetches data when the date changes

    // Effect to update current time and check for day change
    useEffect(() => {
        const timer = setInterval(() => {
            const newNow = new Date();
            setNow(newNow);
            if (newNow.toDateString() !== currentDateString) {
                setCurrentDateString(newNow.toDateString());
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [currentDateString]);

    // Effect to find next prayer and play sound
    useEffect(() => {
        if (prayerTimes.length === 0) return;

        const currentTime = now.getTime();
        let upcomingPrayer = prayerTimes.find(p => p.startTime.getTime() > currentTime);
        
        if (!upcomingPrayer) {
            const fajrTomorrow = prayerTimes[0];
            const tomorrowFajrDate = new Date(fajrTomorrow.startTime);
            tomorrowFajrDate.setDate(tomorrowFajrDate.getDate() + 1);
            upcomingPrayer = { ...fajrTomorrow, startTime: tomorrowFajrDate };
        }
        
        if (upcomingPrayer && previousPrayerRef.current?.name !== upcomingPrayer.name) {
            setNextPrayer(upcomingPrayer);
            if (soundEnabled && Tone.context.state === 'running') {
                synth.current.triggerAttackRelease("C4", "8n");
            }
            previousPrayerRef.current = upcomingPrayer;
        }

        if (upcomingPrayer) {
            const diff = upcomingPrayer.startTime.getTime() - currentTime;
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setTimeToNextPrayer(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        }
    }, [now, prayerTimes, soundEnabled]);
    
    const toggleSound = async () => {
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        setSoundEnabled(!soundEnabled);
    };

    return (
        <div className="bg-gray-900 min-h-screen w-full flex flex-col items-center justify-center text-white salatpagefont p-4 overflow-hidden">
            <div className="w-full max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl shadow-teal-500/10 p-6 sm:p-8 relative">
                <button onClick={toggleSound} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Toggle sound">
                    {soundEnabled ? (
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    ) : (
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                    )}
                </button>
                <div className="text-center mb-6">
                    <h1 className="text-4xl sm:text-5xl font-bold text-teal-400">Prayer Times</h1>
                    <p className="text-gray-400 text-lg mt-2">{location.city}, {location.country}</p>
                    <p className="text-gray-500 text-sm">{now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-teal-500 text-sm mt-1">{hijriDate}</p>
                </div>

                {loading && <p className="text-center text-xl text-teal-400 animate-pulse">{loading}</p>}
                {error && <p className="text-center text-lg text-red-400 bg-red-900/20 p-3 rounded-lg">{error}</p>}

                {!loading && !error && prayerTimes.length > 0 && (
                    <>
                        {nextPrayer && (
                            <div className="text-center mb-8 p-6 bg-gray-700/50 rounded-xl border border-gray-700">
                                <p className="text-xl text-teal-300">Next Prayer</p>
                                <h2 className="text-5xl font-bold text-white my-2">{nextPrayer.name}</h2>
                                <p className="text-4xl font-mono text-teal-400 tracking-widest">{timeToNextPrayer}</p>
                            </div>
                        )}
                        <div className="space-y-4 md:flex md:flex-row md:flex-wrap md:justify-center md:gap-4 md:space-y-0">
                            {prayerTimes.map((prayer) => (
                                <div key={prayer.name} className={`flex justify-between items-center p-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-700/50 md:flex-col md:w-36 md:h-48 md:justify-center md:gap-2 ${nextPrayer?.name === prayer.name ? 'bg-teal-500/20 border-l-4 md:border-l-0 md:border-t-4 border-teal-400 scale-105 shadow-lg shadow-teal-500/20' : 'bg-gray-700/30'}`}>
                                    <div className="flex items-center space-x-4 md:flex-col md:space-x-0 md:gap-2">
                                        <div className="flex-shrink-0">
                                            <PrayerIcon prayerName={prayer.name} />
                                        </div>
                                        <div className="md:text-center">
                                            <p className={`text-xl font-medium ${nextPrayer?.name === prayer.name ? 'text-teal-300' : 'text-gray-300'}`}>{prayer.name}</p>
                                            <p className="text-sm text-gray-500">{prayer.arabic}</p>
                                        </div>
                                    </div>
                                    <div className="text-right md:text-center">
                                        <p className={`text-lg font-mono ${nextPrayer?.name === prayer.name ? 'text-teal-300' : 'text-gray-400'}`}>{formatToAmPm(prayer.startTime)}</p>
                                        <p className="text-xs text-gray-500">Ends {formatToAmPm(prayer.endTime)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Salat;
