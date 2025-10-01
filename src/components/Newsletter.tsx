"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Mail className="h-16 w-16 text-white mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Connected
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Get updates about available pets, upcoming events, and heartwarming
          success stories delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all"
            />
            <button
              type="submit"
              className="bg-white text-amber-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors duration-200 font-bold whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
