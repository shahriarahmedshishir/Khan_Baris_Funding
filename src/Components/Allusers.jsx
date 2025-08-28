import React from "react";
import { useLoaderData } from "react-router-dom";

export default function Allusers() {
  const users = useLoaderData();

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-extrabold text-center mb-4 text-gray-800 ">
          All Users
        </h1>
        <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-12">
          Meet the amazing people in our community.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {users && users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="p-1 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/40 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg h-full p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-100 to-purple-200 dark:from-cyan-800 dark:to-purple-900 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-cyan-700 dark:text-cyan-200">
                      {user.fullName ? user.fullName.charAt(0) : "A"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {user.fullName || "Anonymous User"}
                  </h3>

                  <p className="mt-2 bg-gray-100 dark:bg-gray-700 text-cyan-600 dark:text-cyan-400 text-xs font-bold px-3 py-1 rounded-full">
                    ID: {user.id || "N/A"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
              No users found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
