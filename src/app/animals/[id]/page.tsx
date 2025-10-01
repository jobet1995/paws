import { animals } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import AnimalCard from "@/components/AnimalCard";
import { Calendar, Ruler, Heart, Shield } from "lucide-react";
import Image from "next/image";

export function generateStaticParams() {
  return animals.map((animal) => ({
    id: animal.id,
  }));
}

export default function AnimalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const animal = animals.find((a) => a.id === params.id);

  if (!animal) {
    notFound();
  }

  const relatedAnimals = animals
    .filter(
      (a) =>
        a.species === animal.species &&
        a.id !== animal.id &&
        a.adoptionStatus === "Available",
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-96 lg:h-full">
              <Image
                src={animal.image}
                alt={animal.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-full font-semibold">
                {animal.adoptionStatus}
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {animal.name}
              </h1>
              <p className="text-2xl text-gray-600 mb-6">{animal.breed}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-semibold text-gray-800">
                      {animal.age} {animal.age === 1 ? "year" : "years"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Ruler className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="font-semibold text-gray-800">{animal.size}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Heart className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-semibold text-gray-800">
                      {animal.gender}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Species</p>
                    <p className="font-semibold text-gray-800">
                      {animal.species}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  About {animal.name}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {animal.description}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Personality Traits
                </h2>
                <div className="flex flex-wrap gap-2">
                  {animal.personality.map((trait, index) => (
                    <span
                      key={index}
                      className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Health Information
                </h2>
                <p className="text-gray-700">{animal.healthInfo}</p>
              </div>

              {animal.adoptionStatus === "Available" && (
                <Link
                  href="/adopt"
                  className="block w-full bg-amber-600 text-white text-center px-6 py-4 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-bold text-lg"
                >
                  Apply to Adopt {animal.name}
                </Link>
              )}
            </div>
          </div>
        </div>

        {relatedAnimals.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              More{" "}
              {animal.species === "Dog"
                ? "Dogs"
                : animal.species === "Cat"
                  ? "Cats"
                  : animal.species + "s"}{" "}
              Available
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedAnimals.map((relatedAnimal) => (
                <AnimalCard key={relatedAnimal.id} animal={relatedAnimal} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
