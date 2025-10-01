"use client";

import { useState } from "react";
import AnimalCard from "@/components/AnimalCard";
import { animals } from "@/lib/data";
import { Search } from "lucide-react";

export default function AnimalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies =
      speciesFilter === "All" || animal.species === speciesFilter;
    const matchesAge =
      ageFilter === "All" ||
      (ageFilter === "Young" && animal.age <= 2) ||
      (ageFilter === "Adult" && animal.age > 2 && animal.age <= 7) ||
      (ageFilter === "Senior" && animal.age > 7);
    const matchesSize = sizeFilter === "All" || animal.size === sizeFilter;
    const matchesStatus =
      statusFilter === "All" || animal.adoptionStatus === statusFilter;

    return (
      matchesSearch &&
      matchesSpecies &&
      matchesAge &&
      matchesSize &&
      matchesStatus
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Find Your Perfect Companion
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse our available animals and find your new best friend
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or breed..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Species
              </label>
              <select
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="All">All Species</option>
                <option value="Dog">Dogs</option>
                <option value="Cat">Cats</option>
                <option value="Rabbit">Rabbits</option>
                <option value="Bird">Birds</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="All">All Ages</option>
                <option value="Young">Young (0-2 years)</option>
                <option value="Adult">Adult (3-7 years)</option>
                <option value="Senior">Senior (8+ years)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="All">All Sizes</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAnimals.length} of {animals.length} animals
          </p>
        </div>

        {filteredAnimals.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No animals match your search criteria. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
