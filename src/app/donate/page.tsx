"use client";

import { useState } from "react";
import { Heart, DollarSign, Users, Check } from "lucide-react";

const donationAmounts = [10, 25, 50, 100];
const recentDonors = [
  { name: "Sarah Johnson", amount: 50, time: "2 hours ago" },
  { name: "Michael Chen", amount: 100, time: "5 hours ago" },
  { name: "Emily Rodriguez", amount: 25, time: "1 day ago" },
  { name: "David Thompson", amount: 75, time: "2 days ago" },
  { name: "Maria Garcia", amount: 50, time: "3 days ago" },
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || parseFloat(customAmount);
    alert(
      `Thank you for your ${isRecurring ? "monthly" : "one-time"} donation of $${amount}!`,
    );
    setSelectedAmount(null);
    setCustomAmount("");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const donationAmount = selectedAmount || parseFloat(customAmount) || 0;
  const currentAmount = 12450;
  const goalAmount = 25000;
  const progressPercentage = (currentAmount / goalAmount) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Make a Difference
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your donation helps us provide food, medical care, and shelter to
            animals in need
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">$25</h3>
            <p className="text-gray-600">Feeds one animal for a month</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">$50</h3>
            <p className="text-gray-600">Covers vaccinations and checkup</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">$100</h3>
            <p className="text-gray-600">Provides emergency medical care</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Donation Amount
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`p-4 rounded-lg border-2 font-bold text-xl transition-all ${
                      selectedAmount === amount
                        ? "border-amber-600 bg-amber-50 text-amber-600"
                        : "border-gray-300 hover:border-amber-400"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="Enter amount"
                    min="1"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-gray-700 font-medium">
                    Make this a monthly recurring donation
                  </span>
                </label>
              </div>

              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Donor Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4 mt-6">
                  Payment Information
                </h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={donationAmount === 0}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                    donationAmount > 0
                      ? "bg-amber-600 text-white hover:bg-amber-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {donationAmount > 0
                    ? `Donate $${donationAmount}${isRecurring ? "/month" : ""}`
                    : "Enter donation amount"}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Secure payment processing. Your donation is tax-deductible.
                </p>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Fundraising Goal
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">
                    Raised: ${currentAmount.toLocaleString()}
                  </span>
                  <span className="text-gray-600">
                    Goal: ${goalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-center text-lg font-bold text-amber-600 mt-2">
                  {progressPercentage.toFixed(0)}% Complete
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Help us reach our goal to expand our medical facilities and
                rescue more animals in need.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Recent Donors
              </h3>
              <div className="space-y-4">
                {recentDonors.map((donor, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {donor.name}
                      </p>
                      <p className="text-sm text-gray-500">{donor.time}</p>
                    </div>
                    <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold">
                      ${donor.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg p-6 text-white">
              <Check className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Tax Deductible</h3>
              <p className="text-white/90 text-sm">
                All donations are 100% tax-deductible. You will receive a
                receipt via email for your records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
