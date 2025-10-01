"use client";

import { useState } from "react";
import { animals } from "@/lib/data";
import {
  PawPrint,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  CreditCard as Edit,
  Trash2,
  CircleCheck as CheckCircle,
  Circle as XCircle,
} from "lucide-react";
import Image from "next/image";

type TabType = "animals" | "applications" | "events" | "donations";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("animals");

  const stats = [
    {
      label: "Total Animals",
      value: "12",
      icon: PawPrint,
      color: "bg-blue-500",
    },
    {
      label: "Pending Applications",
      value: "8",
      icon: FileText,
      color: "bg-yellow-500",
    },
    {
      label: "Upcoming Events",
      value: "4",
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      label: "Monthly Donations",
      value: "$12,450",
      icon: DollarSign,
      color: "bg-amber-500",
    },
  ];

  const applications = [
    {
      id: 1,
      applicant: "Sarah Johnson",
      animal: "Max",
      date: "2025-09-28",
      status: "pending",
    },
    {
      id: 2,
      applicant: "Michael Chen",
      animal: "Luna",
      date: "2025-09-27",
      status: "pending",
    },
    {
      id: 3,
      applicant: "Emily Rodriguez",
      animal: "Bella",
      date: "2025-09-26",
      status: "approved",
    },
    {
      id: 4,
      applicant: "David Thompson",
      animal: "Charlie",
      date: "2025-09-25",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 fixed">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-gray-400 text-sm">Paws & Hearts</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("animals")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "animals"
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <PawPrint className="h-5 w-5" />
              <span>Animals</span>
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "applications"
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Applications</span>
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "events"
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Events</span>
            </button>
            <button
              onClick={() => setActiveTab("donations")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "donations"
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <DollarSign className="h-5 w-5" />
              <span>Donations</span>
            </button>
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
            <p className="text-gray-600">
              Welcome back! Here&apos;s what&apos;s happening with your shelter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {activeTab === "animals" && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  Animal Management
                </h3>
                <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-semibold">
                  Add New Animal
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Species
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {animals.slice(0, 6).map((animal) => (
                      <tr key={animal.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Image
                              src={animal.image}
                              alt={animal.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {animal.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {animal.breed}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {animal.species}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {animal.age} years
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              animal.adoptionStatus === "Available"
                                ? "bg-green-100 text-green-800"
                                : animal.adoptionStatus === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {animal.adoptionStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            <Edit className="h-5 w-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "applications" && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">
                  Adoption Applications
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Animal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((app) => (
                      <tr key={app.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {app.applicant}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {app.animal}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {app.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              app.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {app.status === "pending" && (
                            <>
                              <button className="text-green-600 hover:text-green-900 mr-3">
                                <CheckCircle className="h-5 w-5" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <XCircle className="h-5 w-5" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Events Management
                </h3>
                <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-semibold">
                  Create Event
                </button>
              </div>
              <p className="text-gray-600">
                Event management interface will be displayed here.
              </p>
            </div>
          )}

          {activeTab === "donations" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Donation Summary
                </h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Chart Placeholder</p>
                    <p className="text-sm text-gray-500">
                      Monthly donation trends
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-sm text-gray-600 mb-2">This Month</h4>
                  <p className="text-3xl font-bold text-gray-800">$12,450</p>
                  <p className="text-sm text-green-600 mt-2">
                    +15% from last month
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-sm text-gray-600 mb-2">Total Donors</h4>
                  <p className="text-3xl font-bold text-gray-800">248</p>
                  <p className="text-sm text-green-600 mt-2">+32 new donors</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-sm text-gray-600 mb-2">Avg. Donation</h4>
                  <p className="text-3xl font-bold text-gray-800">$50</p>
                  <p className="text-sm text-gray-500 mt-2">Per transaction</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
