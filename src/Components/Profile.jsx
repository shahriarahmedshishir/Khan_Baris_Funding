import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data if the user is available
    if (user && user.email) {
      const fetchProfile = async () => {
        try {
          // Use the user's email to fetch specific profile data
          const response = await fetch(
            `http://localhost:3000/profile?email=${user.email}`
          );

          if (!response.ok) {
            throw new Error(
              "Failed to fetch profile data. Profile may not exist."
            );
          }

          const data = await response.json();
          setProfileData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfile();
    } else {
      // If no user is logged in, stop loading and set a message
      setIsLoading(false);
      setError("Please log in to view this profile.");
    }
  }, [user]); // Re-run the effect when the user object changes

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">
          Loading profile data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  // If no data is returned but there's no error, handle that case
  if (!profileData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">
          No profile found for this user.
        </p>
      </div>
    );
  }

  // Destructure and display the data as you did before
  const {
    id,
    fullName,
    email,
    fathersName,
    mothersName,
    maritalStatus,
    jobTitle,
    address,
    dateOfBirth,
    nationalId,
    gender,
    bloodGroup,
  } = profileData;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const profileFields = [
    { label: "ID", value: id },
    { label: "Full Name", value: fullName },
    { label: "Email", value: email },
    { label: "Father's Name", value: fathersName },
    { label: "Mother's Name", value: mothersName },
    { label: "Marital Status", value: maritalStatus },
    { label: "Job Title", value: jobTitle },
    { label: "Address", value: address },
    { label: "Date of Birth", value: formatDate(dateOfBirth) },
    { label: "National ID", value: nationalId },
    { label: "Gender", value: gender },
    { label: "Blood Group", value: bloodGroup },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          User Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {profileFields.map((field, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">
                {field.label}:
              </span>
              <span className="text-black font-medium">
                {field.value || "N/A"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
