import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const TopBar = () => {
  return (
    <div className="bg-primary text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-black">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-black">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-black">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>

        <div className="text-sm text-center flex-grow">
          <span>Fashion That Lights Your Path</span>
        </div>

        <div className="text-sm hidden md:block">
          <a href="tel:+1234567890" className="hover:text-black">
            +91 1234567890
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
