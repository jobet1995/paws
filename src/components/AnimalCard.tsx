import Link from "next/link";
import Image from "next/image";
import { Animal } from "@/lib/data";
import { Heart } from "lucide-react";

interface AnimalCardProps {
  animal: Animal;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={animal.image}
            alt={animal.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-110"
            priority={false}
          />
        </div>
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-amber-700">
          {animal.adoptionStatus}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-gray-800">{animal.name}</h3>
          <Heart className="h-6 w-6 text-gray-400 hover:text-red-500 hover:fill-red-500 cursor-pointer transition-colors" />
        </div>
        <p className="text-gray-600 mb-1">
          {animal.breed} • {animal.age} {animal.age === 1 ? "year" : "years"}{" "}
          old
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {animal.size} • {animal.gender}
        </p>
        <p className="text-gray-700 mb-6 line-clamp-2">{animal.description}</p>
        <Link
          href={`/animals/${animal.id}`}
          className="block w-full bg-amber-600 text-white text-center px-4 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-semibold"
        >
          Meet {animal.name}
        </Link>
      </div>
    </div>
  );
}
