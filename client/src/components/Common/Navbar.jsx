import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import CartDrawer from "../Layout/CartDrawer";

const Navbar = () => {
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* {Left Logo} */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            ZYRA
          </Link>
        </div>

        {/* {Center - navigation links} */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="#"
            className="text-gray-700 border-b-2 border-transparent hover:border-primary transition-all duration-200 text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-gray-700 border-b-2 border-transparent hover:border-primary transition-all duration-200 text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 border-b-2 border-transparent hover:border-primary transition-all duration-200 text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 border-b-2 border-transparent hover:border-primary transition-all duration-200 text-sm font-medium uppercase"
          >
            Bottom wear
          </Link>
        </div>
        {/* {Right - Icons} */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-primary text-white text-xs rounded-full px-1.5 py-0.5">
              4
            </span>
          </button>
          {/* search */}
          <div>
            <SearchBar className="overflow-hidden" />
          </div>
          <button className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700 " />
          </button>
        </div>
      </nav>
      <CartDrawer/>
    </>
  );
};

export default Navbar;
