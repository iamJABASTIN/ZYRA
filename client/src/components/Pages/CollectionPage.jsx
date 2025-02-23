import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../Products/FilterSidebar";
import SortOptions from "../Products/SortOptions";
import ProductsGrid from "../Products/ProductsGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: 1,
          name: "Product 1",
          price: 1000,
          images: [{ url: "https://picsum.photos/500/500?random=27" }],
        },
        {
          _id: 2,
          name: "Product 2",
          price: 1000,
          images: [{ url: "https://picsum.photos/500/500?random=28" }],
        },
        {
          _id: 3,
          name: "Product 3",
          price: 1000,
          images: [{ url: "https://picsum.photos/500/500?random=29" }],
        },
        {
          _id: 4,
          name: "Product 4",
          price: 1000,
          images: [{ url: "https://picsum.photos/500/500?random=30" }],
        },
        {
          _id: 5,
          name: "Product 5",
          price: 1000,
          images: [{ url: "https://picsum.photos/500/500?random=31" }],
        },
        {
          _id: 6,
          name: "Product 6",
          price: 1000,
          images: [{ url: "https://picsum.photos/500/500?random=32" }],
        },
        {
          _id: 7,
          name: "Product 7",
          price: 1000,
          images: [{ url: "https://picsum.photos/500/500?random=33" }],
        },
        {
          _id: 8,
          name: "Product 8",
          price: 1000,
          images: [{ url: "https://picsum.photos/500/500?random=34" }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
      </button>

      {/* Filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-tra nsform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Product Grid */}
        <ProductsGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
