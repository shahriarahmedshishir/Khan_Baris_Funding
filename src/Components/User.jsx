import React from "react";
import { useLoaderData } from "react-router-dom";

// A simple card component to display user info
const UserCard = ({ user }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
      <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
      <p className="mt-2 text-sm text-gray-600">Email: {user.email}</p>
      <p className="mt-1 text-sm text-gray-600">ID: {user.id}</p>
      <div className="mt-4 border-t pt-4">
        <p className="text-base font-medium text-gray-500">Total Invested</p>
        <p className="text-2xl font-bold text-green-600 mt-1">৳5000</p>
      </div>
    </div>
  );
};

const User = () => {
  // Use the useLoaderData hook to get the user data from the loader.
  // The '|| []' ensures it's always an array to prevent errors.
  const users = useLoaderData() || [];

  // If there are no users, display a message.
  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">No users found.</p>
      </div>
    );
  }

  // Render the list of user cards.
  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            // The key prop is important for list performance in React
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
