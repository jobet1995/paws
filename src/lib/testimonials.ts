export interface Testimonial {
  name: string;
  animal: string;
  image: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    animal: "Max",
    image: "/testimonial1.jpg",
    text: "Adopting Max was the best decision we've ever made. He's brought so much joy to our family!",
  },
  {
    name: "Michael Chen",
    animal: "Luna",
    image: "/testimonial2.jpg",
    text: "The adoption process was smooth and the team was incredibly helpful. Luna has settled in perfectly!",
  },
  {
    name: "Emma Williams",
    animal: "Buddy",
    image: "/testimonial3.jpg",
    text: "Buddy has been a wonderful addition to our home. Thank you for helping us find our perfect match!",
  },
];
