import React from "react";

const EditProfile = () => {
  const handleSave = (e) => {
    e.preventDefault();

    const form = e.target;
    const id = form.id.value;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const fathersName = form.fathersName.value;
    const mothersName = form.mothersName.value;
    const maritalStatus = form.maritalStatus.value;
    const jobTitle = form.jobTitle.value;
    const address = form.address.value;
    const dateOfBirth = form.dateOfBirth.value;
    const nationalId = form.nationalId.value;
    const gender = form.gender.value;
    const bloodGroup = form.bloodGroup.value;

    const profileData = {
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
    };

    fetch("http://localhost:3000/profile", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    console.log("Profile data saved:", profileData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSave}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {/* Row 1: ID & Full Name */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="id"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="fullName"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
          </div>

          {/* Row 2: Email & Father's Name */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="fathersName"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Father's Name
              </label>
              <input
                type="text"
                id="fathersName"
                name="fathersName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
          </div>

          {/* Row 3: Mother's Name & Marital Status */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="mothersName"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Mother's Name
              </label>
              <input
                type="text"
                id="mothersName"
                name="mothersName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="maritalStatus"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Marital Status
              </label>
              <input
                type="text"
                id="maritalStatus"
                name="maritalStatus"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
          </div>

          {/* Row 4: Job Title & Address */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                rows="2"
                required
              />
            </div>
          </div>

          {/* Row 5: Date of Birth & National ID */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nationalId"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                National ID
              </label>
              <input
                type="text"
                id="nationalId"
                name="nationalId"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
          </div>

          {/* Row 6: Gender & Blood Group */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="gender"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Gender
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="bloodGroup"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Blood Group
              </label>
              <input
                type="text"
                id="bloodGroup"
                name="bloodGroup"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
