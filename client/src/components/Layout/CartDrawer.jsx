import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const CartDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-[#ffffff] shadow-lg transform transition-transform duaration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
        <div className="flex justify-end p-4">
            <button onClick={toggleCartDrawer}>
                <IoMdClose className="h-6 w-6 text-gray-600"/>
            </button>
        </div>
    </div>
  );
};

export default CartDrawer;
