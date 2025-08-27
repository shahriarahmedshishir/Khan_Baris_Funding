import Marquee from "react-fast-marquee";

import "../App.css";
import { LampDemo } from "./LampDemo";
const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-linear-to-r from-[#1e3c98] to-[#173383] text-black h-screen flex flex-col items-center">
      <div className="w-full sm:w-10/12 bg-transparent backdrop-blur-md flex flex-row justify-between items-center p-2 sm:p-4 rounded-lg shadow-lg ">
        <div className="bg-linear-to-r from-[#da4de0] to-[#5a03ed] w-[30%] sm:w-[15%] h-14 font-extrabold flex items-center justify-center rounded-l-lg border-4 border-gray-200 text-center text-sm sm:text-base shadow text-white">
          Notice
        </div>
        <Marquee
          className="bg-gray-200 w-[68%] sm:w-[83%] h-14 flex items-center justify-center"
          pauseOnHover={true}
        >
          <h1 className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent text-sm sm:text-2xl whitespace-nowrap px-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, non? Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut esse inventore ullam, quas veniam laboriosam maxime laborum nam dolores veritatis quod reprehenderit libero animi quia debitis! Deleniti illo officiis eum?
          </h1>
        </Marquee>
      </div>
      <LampDemo></LampDemo>
    </div>
  );
};

export default About;
