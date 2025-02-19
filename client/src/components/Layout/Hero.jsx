import Button from "../UI/Button";
import { statistics, outfits } from "../../constants";
import p1 from "../../assets/combo/p1.jpg";
import OutfitCard from "../UI/OutfitCard";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col justify-center min-h-[85vh] gap-10 max-container p-30"
    >
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">
        <p className="text-xl font-montserrat text-primary">
          Our Latest Collection
        </p>
        <h1 className="mt-10 text-8xl max-sm:text-[72px] max-sm:leading-[82]">
          <span className="xl:bg-[#ffff] xl:whitespace-nowrap relative z-10 pr-10">
            The New Arrival
          </span>
          <br />
          <span className="text-primary inline-block mt-3">ZYRA</span> Combo
        </h1>
        <p className="font-montserrat text-slate-400 text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
          Discover stylish ZYRA arrivals, quality comfort, and stylish for your
          active life.
        </p>
        <Button label="Shop now" />
        <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="leading-7 text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center bg-card bg-center bg-cover items-center xl:min-h-screen max-xl:py-40">
        <img
          src={p1}
          alt="Outfit images"
          width={600}
          height={500}
          className="object-contain relative"
        />
        <div className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6">
          {outfits.map((outfit) => (
            <div key={outfit}>
              <OutfitCard
                imgURL={outfit}
                changeOutfitImage={() => {}}
                outfitImage=""
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
