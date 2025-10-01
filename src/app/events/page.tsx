"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import { events } from "@/lib/data";

export default function EventsPage() {
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredEvents = events.filter((event) => {
    return typeFilter === "All" || event.type === typeFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Upcoming Events
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join us at our upcoming events and help make a difference in the
            lives of animals
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <label className="text-sm font-medium text-gray-700">
              Filter by Type:
            </label>
            <div className="flex flex-wrap gap-2">
              {["All", "Adoption Drive", "Fundraiser", "Volunteer"].map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      typeFilter === type
                        ? "bg-amber-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {type}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No events match your filter. Check back soon for updates!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Want to Volunteer?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            We&apos;re always looking for passionate individuals to join our
            team. Whether you can spare a few hours a week or want to help at
            events, we&apos;d love to have you!
          </p>
          <button className="bg-white text-amber-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-200 font-bold text-lg">
            Become a Volunteer
          </button>
        </div>
      </div>
    </div>
  );
}
