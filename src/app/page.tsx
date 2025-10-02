import HeroSection from "@/components/HeroSection";
import AnimalCard from "@/components/AnimalCard";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Newsletter from "@/components/Newsletter";
import { animals, testimonials } from "@/lib/data";
import Image from "next/image";
import { Heart, Users, Chrome as HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featuredAnimals = animals
    .filter((a) => a.adoptionStatus === "Available")
    .slice(0, 3);

  return (
    <div>
      <HeroSection />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-amber-50 rounded-xl">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Animals Rescued</p>
            </div>
            <div className="text-center p-8 bg-amber-50 rounded-xl">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">350+</h3>
              <p className="text-gray-600">Successful Adoptions</p>
            </div>
            <div className="text-center p-8 bg-amber-50 rounded-xl">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">100+</h3>
              <p className="text-gray-600">Active Volunteers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Featured Pets
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These adorable companions are waiting for their forever homes.
              Could one of them be your perfect match?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/animals"
              className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors duration-200 font-semibold"
            >
              View All Animals
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Make a Difference Today
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Your support helps us provide food, medical care, and shelter to
                animals in need. Every donation, no matter the size, makes a
                real impact in the lives of these precious animals.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="bg-amber-100 text-amber-700 rounded-full p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4" />
                  </span>
                  <span className="text-gray-700">
                    $25 provides food for one animal for a month
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-100 text-amber-700 rounded-full p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4" />
                  </span>
                  <span className="text-gray-700">
                    $50 covers basic medical checkup and vaccinations
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-amber-100 text-amber-700 rounded-full p-1 mr-3 mt-1">
                    <Heart className="h-4 w-4" />
                  </span>
                  <span className="text-gray-700">
                    $100 helps with emergency medical care
                  </span>
                </li>
              </ul>
              <Link
                href="/donate"
                className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors duration-200 font-semibold"
              >
                Donate Now
              </Link>
            </div>
            <div className="relative h-96 lg:h-full rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/3628100/pexels-photo-3628100.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Volunteer with dog"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
