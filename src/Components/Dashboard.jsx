import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

// --- SVG ICONS (Replaced react-icons) --- //

const ArrowUpRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const ArrowDownRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="7" y1="7" x2="17" y2="17"></line>
    <polyline points="17 7 17 17 7 17"></polyline>
  </svg>
);

const StarIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const initialStats = {
  totalValue: 0,
  totalIncome: 0,
  totalExpenses: 0,
};

const StatCard = ({ title, value, isExpense = false }) => (
  <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
    <p className="text-base font-medium text-gray-500">{title}</p>
    <p
      className={`mt-2 text-3xl font-bold ${
        isExpense ? "text-red-600" : "text-gray-900"
      }`}
    >
      ৳
      {value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </p>
  </div>
);

const TransactionsTable = ({ transactions }) => {
  const getIconForType = (type) => {
    switch (type) {
      case "add":
        return <ArrowUpRightIcon className="mr-2 text-green-500" />;
      case "withdraw":
        return <ArrowDownRightIcon className="mr-2 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">All Transactions</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">
                    {getIconForType(t.type)}
                    {t.type === "add" ? "Add Fund" : "Withdraw"}
                  </div>
                </td>
                <td className="px-6 py-4">{t.name}</td>
                <td className="px-6 py-4">{t.description}</td>
                <td className="px-6 py-4">{t.date}</td>
                <td className="px-6 py-4 font-medium text-gray-900 inline-block">
                  {parseFloat(t.amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const transactions = useLoaderData();

  const totalIncome = transactions
    .filter((t) => t.type === "add")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "withdraw")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalValue = totalIncome - totalExpenses;

  const [stats] = useState({
    ...initialStats,
    totalValue,
    totalIncome,
    totalExpenses,
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Fund Overview</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <StatCard title="Total Current Value" value={stats.totalValue} />
          <StatCard title="Total Fund Income" value={stats.totalIncome} />
          <StatCard
            title="Total Expenses"
            value={stats.totalExpenses}
            isExpense={true}
          />
        </div>

        {/* Transactions Table */}
        <div>
          <TransactionsTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
