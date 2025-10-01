import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Help Us Save Animals
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Every pet deserves a loving home. Join us in our mission to rescue,
          rehabilitate, and rehome animals in need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/adopt"
            className="w-full sm:w-auto bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl font-bold text-lg"
          >
            Adopt Now
          </Link>
          <Link
            href="/donate"
            className="w-full sm:w-auto bg-white text-amber-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl font-bold text-lg"
          >
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
}
