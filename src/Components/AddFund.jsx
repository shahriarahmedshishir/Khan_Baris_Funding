import React, { useState } from "react";

const AddFund = () => {
  const [transactionType, setTransactionType] = useState("add");
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const [currentDate] = useState(formatDate(new Date()));

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const amount = form.amount.value;
    const id = form.id.value;
    const type = form.transactionType.value;

    const transactionData = {
      id,
      name,
      description,
      amount,
      date: currentDate,
      type,
    };

    // Send the data to the server
    fetch(`http://localhost:3000/fund`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(transactionData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Transaction successful:", data);
        // You can add logic here to show a success message to the user
      })
      .catch((err) => {
        console.error("Failed to make transaction:", err);
        // You can add logic here to show an error message
      });

    console.log("Transaction Data:", transactionData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {transactionType === "add" ? "Add New Fund" : "Withdraw Fund"}
        </h2>

        {/* Transaction Type Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="transactionType"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Transaction Type
          </label>
          <select
            id="transactionType"
            name="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="add">Add Fund</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* User ID Input */}
        <div className="mb-4">
          <label
            htmlFor="id"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            User Id
          </label>
          <input
            type="text"
            id="id"
            name="id"
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Date Input (Read-only, dd/mm/yy) */}
        <div className="mb-6">
          <label
            htmlFor="date"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Date
          </label>
          <input
            type="text"
            id="date"
            name="date"
            value={currentDate}
            readOnly
            className="w-full px-4 py-2 border rounded-lg text-black bg-gray-100 cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`w-full text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${
              transactionType === "add"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {transactionType === "add" ? "Add Fund" : "Withdraw"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFund;
