"use client";

import React, { useState } from "react";
import OrderStatCard from "./OrderStatCard";
import {
  FaShoppingCart,
  FaRupeeSign,
  FaTruck,
  FaChartLine,
  FaTimesCircle,
  FaUndoAlt,
  FaHourglassHalf,
} from "react-icons/fa";

const OrderStats = () => {
  const [selectedCategory, setSelectedCategory] = useState("Overall");

  const allStats = {
    Overall: {
      totalOrders: "1,234",
      monthlyOrders: "450",
      monthlyDelivered: "420",
      canceled: "56",
      delivered: "1,020",
      refunds: "24",
      growth: "15%",
      revenue: "₹12,345",
      gst: "₹2,000",
      returnMoney: "₹1,100",
      pendingOrders: "134",
      overallTurnover: "₹15,000", // Overall turnover
      monthlyTurnover: "₹1,200", // Monthly turnover
      yearlyTurnover: "₹14,400", // Yearly turnover
      expenses: "₹10,000", // Expenses (for profit calculation)
    },
    Grocery: {
      totalOrders: "523",
      monthlyOrders: "100",
      monthlyDelivered: "420",
      canceled: "12",
      delivered: "490",
      refunds: "5",
      growth: "8%",
      revenue: "₹5,200",
      gst: "₹800",
      returnMoney: "₹300",
      pendingOrders: "21",
      overallTurnover: "₹6,000", // Overall turnover
      monthlyTurnover: "₹500", // Monthly turnover
      yearlyTurnover: "₹6,000", // Yearly turnover
      expenses: "₹3,000", // Expenses (for profit calculation)
    },
    Stationary: {
      totalOrders: "210",
      monthlyOrders: "86",
      monthlyDelivered: "420",
      canceled: "4",
      delivered: "200",
      refunds: "2",
      growth: "5%",
      revenue: "₹2,150",
      gst: "₹400",
      returnMoney: "₹150",
      pendingOrders: "6",
      overallTurnover: "₹2,500",
      monthlyTurnover: "₹200",
      yearlyTurnover: "₹2,400",
      expenses: "₹1,500", // Expenses (for profit calculation)
    },
    Cosmetics: {
      totalOrders: "340",
      monthlyOrders: "45",
      monthlyDelivered: "420",
      canceled: "6",
      delivered: "320",
      refunds: "3",
      growth: "10%",
      revenue: "₹4,500",
      gst: "₹700",
      returnMoney: "₹200",
      pendingOrders: "14",
      overallTurnover: "₹5,000",
      monthlyTurnover: "₹400",
      yearlyTurnover: "₹4,800",
      expenses: "₹2,500", // Expenses (for profit calculation)
    },
    Pooja: {
      totalOrders: "161",
      monthlyOrders: "800",
      monthlyDelivered: "420",
      canceled: "2",
      delivered: "155",
      refunds: "1",
      growth: "4%",
      revenue: "₹1,200",
      gst: "₹250",
      returnMoney: "₹50",
      pendingOrders: "4",
      overallTurnover: "₹1,500",
      monthlyTurnover: "₹150",
      yearlyTurnover: "₹1,800",
      expenses: "₹1,000", // Expenses (for profit calculation)
    },
  };

  const stats = allStats[selectedCategory];

  const calculateProfit = (revenue: number, expenses: number) => {
    const profitAmount = revenue - expenses;
    const profitPercentage = ((profitAmount / expenses) * 100).toFixed(2);
    return { profitAmount, profitPercentage };
  };

  const { profitAmount, profitPercentage } = calculateProfit(
    parseFloat(stats.revenue.replace("₹", "").replace(",", "")),
    parseFloat(stats.expenses.replace("₹", "").replace(",", ""))
  );

  const statsInfo = [
    { title: "Total Orders", value: stats.totalOrders, icon: <FaShoppingCart className="text-blue-500" /> },
    { title: "Monthly Orders", value: stats.monthlyOrders, icon: <FaShoppingCart className="text-orange-500" /> },
    { title: "Monthly Delivery", value: stats.monthlyDelivered, icon: <FaTruck className="text-blue-400" /> },
    { title: "Canceled Orders", value: stats.canceled, icon: <FaTimesCircle className="text-gray-500" /> },
    { title: "Delivered Orders", value: stats.delivered, icon: <FaTruck className="text-yellow-500" /> },
    { title: "Pending Orders", value: stats.pendingOrders, icon: <FaHourglassHalf className="text-orange-500" /> },
    { title: "Refunds", value: stats.refunds, icon: <FaUndoAlt className="text-purple-500" /> },
    { title: "Growth", value: stats.growth, icon: <FaChartLine className="text-red-500" /> },
    { title: "Revenue", value: stats.revenue, icon: <FaRupeeSign className="text-green-500" /> },
    { title: "GST", value: stats.gst, icon: <FaRupeeSign className="text-green-500" /> },
    { title: "Return Money", value: stats.returnMoney, icon: <FaRupeeSign className="text-red-500" /> },
    { title: "Overall Turnover", value: stats.overallTurnover, icon: <FaRupeeSign className="text-green-500" /> },
    { title: "Monthly Turnover", value: stats.monthlyTurnover, icon: <FaRupeeSign className="text-green-500" /> },
    { title: "Yearly Turnover", value: stats.yearlyTurnover, icon: <FaRupeeSign className="text-green-500" /> },
    { title: "Profit", value: `₹${profitAmount}`, description: `${profitPercentage}% profit`, icon: <FaRupeeSign className="text-red-500 " /> },
  ];

  return (
    <div className="p-1">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Order Statistics</h2>

      {/* Dropdown for category selection */}
      <div className="mb-6">
        <label htmlFor="category-select" className="block text-lg font-medium text-gray-600 mb-2">
          Select Category:
        </label>
        <select
          id="category-select"
          className="p-2 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {Object.keys(allStats).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Stats display */}
      <div className="grid grid-cols-2 gap-6">
        {statsInfo.map((stat) => (
          <OrderStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description || stat.title + " for this category"}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderStats;
