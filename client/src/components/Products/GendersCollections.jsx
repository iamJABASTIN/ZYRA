import mens_collection from "../../assets/mens_collections_2.jpeg";
import womens_collections from "../../assets/womens_collections.jpeg";
import { Link } from "react-router-dom";

const GendersCollections = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection */}
        <div className="group relative flex-1 overflow-hidden rounded shadow-lg">
          <img
            src={womens_collections}
            alt="Women's Collections"
            className="w-full h-[700px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500"></div>
          {/* Text Content */}
          <div className="absolute bottom-8 left-8 p-4">
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3 transition-colors duration-500 group-hover:text-gray-200">
              Women'€€s Collections
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-black px-4 py-2 rounded-md bg-white transition-colors duration-500"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collections */}
        <div className="group relative flex-1 overflow-hidden rounded shadow-lg">
          <img
            src={mens_collection}
            alt="Men's Collections"
            className="w-full h-[700px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500"></div>
          {/* Text Content */}
          <div className="absolute bottom-8 left-8 p-4">
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3 transition-colors duration-500 group-hover:text-gray-200">
              Men's Collections
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-black px-4 py-2 rounded-md bg-white transition-colors duration-500"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GendersCollections;
