export interface Animal {
  id: string;
  name: string;
  species: "Dog" | "Cat" | "Rabbit" | "Bird";
  breed: string;
  age: number;
  size: "Small" | "Medium" | "Large";
  gender: "Male" | "Female";
  description: string;
  personality: string[];
  healthInfo: string;
  adoptionStatus: "Available" | "Pending" | "Adopted";
  image: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: "Adoption Drive" | "Fundraiser" | "Volunteer";
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  image: string;
  animal: string;
}

export const animals: Animal[] = [
  {
    id: "1",
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    size: "Large",
    gender: "Male",
    description:
      "Max is a friendly and energetic golden retriever who loves to play fetch and go on long walks.",
    personality: ["Friendly", "Energetic", "Loyal", "Good with kids"],
    healthInfo: "Fully vaccinated, neutered, microchipped",
    adoptionStatus: "Available",
    image:
      "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    name: "Luna",
    species: "Cat",
    breed: "Siamese",
    age: 2,
    size: "Small",
    gender: "Female",
    description:
      "Luna is a beautiful and affectionate Siamese cat who enjoys cuddling and window-watching.",
    personality: ["Affectionate", "Quiet", "Independent", "Playful"],
    healthInfo: "Fully vaccinated, spayed, microchipped",
    adoptionStatus: "Available",
    image:
      "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    name: "Charlie",
    species: "Dog",
    breed: "Beagle Mix",
    age: 5,
    size: "Medium",
    gender: "Male",
    description:
      "Charlie is a sweet beagle mix who loves treats and snuggling on the couch.",
    personality: ["Calm", "Gentle", "House-trained", "Good with other pets"],
    healthInfo: "Fully vaccinated, neutered, microchipped",
    adoptionStatus: "Available",
    image:
      "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "4",
    name: "Bella",
    species: "Cat",
    breed: "Tabby",
    age: 1,
    size: "Small",
    gender: "Female",
    description:
      "Bella is a playful young tabby who loves chasing toys and exploring.",
    personality: ["Playful", "Curious", "Energetic", "Friendly"],
    healthInfo: "Fully vaccinated, spayed, microchipped",
    adoptionStatus: "Pending",
    image:
      "https://images.pexels.com/photos/1571076/pexels-photo-1571076.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "5",
    name: "Rocky",
    species: "Dog",
    breed: "German Shepherd",
    age: 4,
    size: "Large",
    gender: "Male",
    description:
      "Rocky is a loyal and protective German Shepherd looking for an experienced owner.",
    personality: ["Loyal", "Protective", "Intelligent", "Active"],
    healthInfo: "Fully vaccinated, neutered, microchipped",
    adoptionStatus: "Available",
    image:
      "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "6",
    name: "Mittens",
    species: "Cat",
    breed: "Persian",
    age: 6,
    size: "Medium",
    gender: "Female",
    description:
      "Mittens is a calm and elegant Persian cat who enjoys a quiet home.",
    personality: ["Calm", "Elegant", "Quiet", "Affectionate"],
    healthInfo: "Fully vaccinated, spayed, microchipped",
    adoptionStatus: "Available",
    image:
      "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "7",
    name: "Coco",
    species: "Rabbit",
    breed: "Holland Lop",
    age: 2,
    size: "Small",
    gender: "Female",
    description:
      "Coco is an adorable rabbit who loves munching on fresh vegetables.",
    personality: ["Gentle", "Friendly", "Curious", "Playful"],
    healthInfo: "Vaccinated, spayed",
    adoptionStatus: "Available",
    image:
      "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "8",
    name: "Buddy",
    species: "Dog",
    breed: "Labrador Retriever",
    age: 2,
    size: "Large",
    gender: "Male",
    description:
      "Buddy is an enthusiastic lab who loves swimming and playing with other dogs.",
    personality: ["Energetic", "Friendly", "Social", "Trainable"],
    healthInfo: "Fully vaccinated, neutered, microchipped",
    adoptionStatus: "Available",
    image:
      "https://images.pexels.com/photos/1938125/pexels-photo-1938125.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const events: Event[] = [
  {
    id: "1",
    title: "Spring Adoption Drive",
    date: "2025-10-15",
    location: "Main Shelter - 123 Hope Street",
    description:
      "Join us for our spring adoption event featuring reduced adoption fees and meet & greets with all our available animals.",
    type: "Adoption Drive",
    image:
      "https://images.pexels.com/photos/7210754/pexels-photo-7210754.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    title: "Annual Charity Gala",
    date: "2025-10-22",
    location: "Grand Hotel Ballroom",
    description:
      "Our biggest fundraising event of the year with dinner, silent auction, and special guest speakers.",
    type: "Fundraiser",
    image:
      "https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    title: "Volunteer Orientation",
    date: "2025-10-10",
    location: "Main Shelter - Training Room",
    description:
      "Learn how you can make a difference by volunteering at our shelter. No experience necessary!",
    type: "Volunteer",
    image:
      "https://images.pexels.com/photos/6646914/pexels-photo-6646914.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "4",
    title: "Pet Care Workshop",
    date: "2025-11-05",
    location: "Community Center",
    description:
      "Free workshop covering basic pet care, training tips, and nutrition advice from our expert team.",
    type: "Volunteer",
    image:
      "https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Prepare Your Home for a New Pet",
    excerpt:
      "Bringing home a new pet is exciting! Here are essential tips to make the transition smooth for both you and your new furry friend.",
    content:
      "Bringing home a new pet is an exciting time, but preparation is key to ensuring a smooth transition...",
    author: "Sarah Johnson",
    date: "2025-09-25",
    category: "Pet Care",
    image:
      "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    title: "The Benefits of Adopting Senior Pets",
    excerpt:
      "Senior pets make wonderful companions. Discover why adopting an older animal might be the perfect choice for your family.",
    content:
      "Many people overlook senior pets at shelters, but these animals have so much love to give...",
    author: "Michael Chen",
    date: "2025-09-20",
    category: "Adoption",
    image:
      "https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    title: "Success Story: Max Finds His Forever Home",
    excerpt:
      "Read about Max, a golden retriever who spent months at our shelter before finding the perfect family.",
    content:
      "Max arrived at our shelter last spring, nervous and uncertain. Today, he is thriving with his new family...",
    author: "Emily Rodriguez",
    date: "2025-09-15",
    category: "Success Stories",
    image:
      "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Jennifer Williams",
    text: "Adopting Luna from this shelter was the best decision we ever made. The staff was so helpful and made sure we were a perfect match. Luna has brought so much joy to our family!",
    image:
      "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800",
    animal: "Luna - Siamese Cat",
  },
  {
    id: "2",
    name: "David Thompson",
    text: "The adoption process was smooth and the team really cares about finding the right homes for their animals. Charlie is the perfect companion and we could not be happier!",
    image:
      "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800",
    animal: "Charlie - Beagle Mix",
  },
  {
    id: "3",
    name: "Maria Garcia",
    text: "I was nervous about adopting my first pet, but the shelter staff provided amazing support and guidance. Bella is now a beloved member of our family. Thank you!",
    image:
      "https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=800",
    animal: "Bella - Tabby Cat",
  },
];
