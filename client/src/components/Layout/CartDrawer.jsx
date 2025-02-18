import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-[#ffffff] shadow-lg transform transition-transform duaration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {/* Cart Content with scrollable area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {/* component of cart content */}
        <CartContents />
      </div>

      {/* Check out button fixed at bottom */}
      <div className="p-4 bg-[#FFFFFF] sticky bottom-0 ">
        <button className="px-3 py-2 w-full outline-none focus:outline-none bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition">
          Checkout
        </button>
        <p className="text-gray-500 text-center text-sm tracking-tighter mt-2">
          Shipping, taxes, and discount calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
