import heroImg from "../../assets/rabbit-hero.webp";
import React from "react";

const Hero = () => {
  return (
    <section>
      <img
        src={heroImg}
        alt="Image about brand clothings"
        className="w-full h-[400px] md:h-[600px] lg:h-[750] object-cover"
      />
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <div className="text-center text-white p-6">
            <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                Vacation
            </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
