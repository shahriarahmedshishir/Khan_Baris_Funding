import React, { useState, useEffect } from "react";

// This is a presentational component for displaying a single user.
const UserCard = ({ user }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
      <h3 className="text-xl font-bold text-gray-900">{user.fullName}</h3>
      <p className="mt-2 text-sm text-gray-600">Email: {user.email}</p>
      <p className="mt-1 text-sm text-gray-600">ID: {user.id}</p>
      <div className="mt-4 border-t pt-4">
        <p className="text-base font-medium text-gray-500">Total Invested</p>
        <p className="text-2xl font-bold text-green-600 mt-1">
          ৳{user.totalInvested || 0}
        </p>
      </div>
    </div>
  );
};

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const profilesUrl = "http://localhost:3000/allprofile";
        const investmentsUrl = "http://localhost:3000/fund";

        const [profilesRes, investmentsRes] = await Promise.all([
          fetch(profilesUrl),
          fetch(investmentsUrl),
        ]);

        const profiles = await profilesRes.json();
        const investments = await investmentsRes.json();

        const enrichedProfiles = profiles.map((profile) => {
          const userInvestments = investments.filter(
            (inv) => inv.id === profile.id && inv.type === "add"
          );

          const totalInvested = userInvestments.reduce(
            (sum, inv) => sum + parseInt(inv.amount, 10),
            0
          );

          return {
            ...profile,
            totalInvested: totalInvested,
          };
        });

        setUsers(enrichedProfiles);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        // Ensure the loading state is turned off, even if there's an error.
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // The empty array [] ensures this effect runs only once.

  // Display a loading message while data is being fetched.
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading users...</p>
      </div>
    );
  }

  // Display a message if no users were found.
  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">No users found.</p>
      </div>
    );
  }

  // Render the list of user cards once the data is ready.
  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
