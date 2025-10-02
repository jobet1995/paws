"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-amber-500 fill-amber-500" />
              <span className="text-xl font-bold text-white">
                Paws & Hearts
              </span>
            </div>
            <p className="text-sm mb-4">
              Dedicated to rescuing and rehoming animals in need. Every pet
              deserves a loving home.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-amber-500" />
                <span>123 Hope Street, Cityville, ST 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-amber-500" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-amber-500" />
                <span>info@pawsandhearts.org</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                "Home",
                "Animals",
                "Adopt",
                "Donate",
                "Events",
                "Blog",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm hover:text-amber-500 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Get Involved
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/adopt"
                  className="text-sm hover:text-amber-500 transition-colors duration-200"
                >
                  Adopt a Pet
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-sm hover:text-amber-500 transition-colors duration-200"
                >
                  Make a Donation
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-sm hover:text-amber-500 transition-colors duration-200"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-sm hover:text-amber-500 transition-colors duration-200"
                >
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Newsletter
            </h3>
            <p className="text-sm mb-4">
              Stay updated with our latest news and available pets.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              <button
                type="submit"
                className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium"
              >
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-amber-500 transition-colors duration-200"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-amber-500 transition-colors duration-200"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-amber-500 transition-colors duration-200"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {year} Paws & Hearts Animal Shelter. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}