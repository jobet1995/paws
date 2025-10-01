"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const steps = [
  "Personal Info",
  "Home Environment",
  "Pet Preferences",
  "Review",
];

export default function AdoptPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    homeType: "",
    ownRent: "",
    hasYard: "",
    otherPets: "",
    petDetails: "",
    householdMembers: "",
    allergies: "",
    preferredSpecies: "",
    preferredAge: "",
    preferredSize: "",
    activityLevel: "",
    experience: "",
    reason: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you for your adoption application! We will review it and contact you soon.",
    );
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      homeType: "",
      ownRent: "",
      hasYard: "",
      otherPets: "",
      petDetails: "",
      householdMembers: "",
      allergies: "",
      preferredSpecies: "",
      preferredAge: "",
      preferredSize: "",
      activityLevel: "",
      experience: "",
      reason: "",
    });
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Adoption Application
          </h1>
          <p className="text-gray-600 text-lg">
            Take the first step towards welcoming a new family member
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      index <= currentStep
                        ? "bg-amber-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs mt-2 text-center hidden sm:block">
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors ${
                      index < currentStep ? "bg-amber-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Home Environment
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Home *
                </label>
                <select
                  name="homeType"
                  value={formData.homeType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you own or rent? *
                </label>
                <select
                  name="ownRent"
                  value={formData.ownRent}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="own">Own</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have a yard? *
                </label>
                <select
                  name="hasYard"
                  value={formData.hasYard}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="yes-fenced">Yes, fenced</option>
                  <option value="yes-unfenced">Yes, unfenced</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have other pets? *
                </label>
                <select
                  name="otherPets"
                  value={formData.otherPets}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              {formData.otherPets === "yes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please describe your other pets
                  </label>
                  <textarea
                    name="petDetails"
                    value={formData.petDetails}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of household members *
                </label>
                <input
                  type="number"
                  name="householdMembers"
                  value={formData.householdMembers}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any allergies in the household?
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="None"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Pet Preferences
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Species *
                </label>
                <select
                  name="preferredSpecies"
                  value={formData.preferredSpecies}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="rabbit">Rabbit</option>
                  <option value="bird">Bird</option>
                  <option value="any">Any</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Age *
                </label>
                <select
                  name="preferredAge"
                  value={formData.preferredAge}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="young">Young (0-2 years)</option>
                  <option value="adult">Adult (3-7 years)</option>
                  <option value="senior">Senior (8+ years)</option>
                  <option value="any">Any</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Size *
                </label>
                <select
                  name="preferredSize"
                  value={formData.preferredSize}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="any">Any</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Level *
                </label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="low">Low (prefer calm pets)</option>
                  <option value="moderate">Moderate (balanced energy)</option>
                  <option value="high">High (active lifestyle)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Pet Experience *
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="first">First-time pet owner</option>
                  <option value="some">Some experience</option>
                  <option value="extensive">Extensive experience</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to adopt? *
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Review Your Application
              </h2>

              <div className="bg-amber-50 rounded-lg p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                  Personal Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {formData.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {formData.phone}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {formData.address}, {formData.city}, {formData.state}{" "}
                    {formData.zipCode}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                  Home Environment
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Home Type:</span>{" "}
                    {formData.homeType}
                  </p>
                  <p>
                    <span className="font-medium">Own/Rent:</span>{" "}
                    {formData.ownRent}
                  </p>
                  <p>
                    <span className="font-medium">Yard:</span>{" "}
                    {formData.hasYard}
                  </p>
                  <p>
                    <span className="font-medium">Other Pets:</span>{" "}
                    {formData.otherPets}
                  </p>
                  <p>
                    <span className="font-medium">Household Members:</span>{" "}
                    {formData.householdMembers}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                  Pet Preferences
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Species:</span>{" "}
                    {formData.preferredSpecies}
                  </p>
                  <p>
                    <span className="font-medium">Age:</span>{" "}
                    {formData.preferredAge}
                  </p>
                  <p>
                    <span className="font-medium">Size:</span>{" "}
                    {formData.preferredSize}
                  </p>
                  <p>
                    <span className="font-medium">Activity Level:</span>{" "}
                    {formData.activityLevel}
                  </p>
                  <p>
                    <span className="font-medium">Experience:</span>{" "}
                    {formData.experience}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  By submitting this application, you agree to our adoption
                  terms and conditions. We will review your application and
                  contact you within 3-5 business days.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                currentStep === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center space-x-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
              >
                <span>Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                <Check className="h-5 w-5" />
                <span>Submit Application</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
