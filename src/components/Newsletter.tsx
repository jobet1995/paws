"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
          Stay in the Know
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Subscribe to our newsletter to get the latest news, updates, and
          special offers.
        </p>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full max-w-md px-4 py-3 rounded-l-lg bg-white text-gray-900 border border-gray-300 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-r-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors duration-200"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
