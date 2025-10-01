'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Animals', href: '/animals' },
    { name: 'Adopt', href: '/adopt' },
    { name: 'Donate', href: '/donate' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-amber-600 fill-amber-600" />
            <span className="text-xl font-bold text-gray-800">
              Paws & Hearts Shelter
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium ${isActive ? 'text-amber-600' : ''}`}>
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            <Link
              href="/donate"
              className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold">
              Donate Now
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-amber-600 transition-colors"
            aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 font-medium ${isActive ? 'text-amber-600' : ''}`}
                  onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/donate"
              className="block text-center bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-all duration-200 shadow-md font-semibold mt-4"
              onClick={() => setIsOpen(false)}>
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
