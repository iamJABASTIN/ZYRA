import heroImg from "../../assets/rabbit-hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <img
        src={heroImg}
        alt="Image about brand clothings"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover animate-kenBurns"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30"></div>
      {/* Centered Text Container */}
      <div className="absolute inset-0 flex items-end justify-center">
        <div className="text-center text-white p-6">
          {/* Animated Heading with Bounce Effect */}
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold tracking-tighter uppercase mb-4 animate-textEntrance">
            Vacation <br /> Ready
          </h1>
          {/* Animated Subheading */}
          <p className="text-sm tracking-tighter md:text-lg mb-6 animate-textEntrance delay-200">
            Explore our vacation ready outfits with fast world wide shipping
          </p>
          {/* Animated Button with Hover Scale */}
          <Link
            to="#"
            className="bg-white text-gray-950 px-6 py-2 rounded-md text-lg font-medium animate-textEntrance delay-400 transition-transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
