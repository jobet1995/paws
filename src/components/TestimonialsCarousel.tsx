"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export interface Testimonial {
  name: string;
  animal: string;
  image: string;
  text: string;
}

export default function TestimonialsCarousel({ testimonials, autoplay = true }: { testimonials: Testimonial[], autoplay?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonialsLength = testimonials ? testimonials.length : 0;

  const next = useCallback(() => {
    if (testimonialsLength > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonialsLength);
    }
  }, [testimonialsLength]);

  const prev = () => {
    if (testimonialsLength > 0) {
      setCurrentIndex(
        (prev) => (prev - 1 + testimonialsLength) % testimonialsLength,
      );
    }
  };

  useEffect(() => {
    if (autoplay && !isPaused && testimonialsLength > 0) {
      const timer = setInterval(next, 5000);
      return () => clearInterval(timer);
    }
  }, [autoplay, isPaused, next, testimonialsLength, currentIndex]);

  if (testimonialsLength === 0) {
    return null;
  }

  return (
    <div 
      className="bg-amber-50 py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-testid="testimonials-carousel"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Happy Tails
        </h2>

        <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <Quote className="absolute top-6 left-6 h-12 w-12 text-amber-200" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
              <div className="relative w-24 h-24 rounded-full border-4 border-amber-200">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="rounded-full object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-800">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-amber-600 font-medium">
                  Adopted {testimonials[currentIndex].animal}
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed italic mb-8">
              &ldquo;{testimonials[currentIndex].text}&rdquo;
            </p>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-amber-700" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-amber-600"
                      : "w-2 bg-amber-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-amber-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}