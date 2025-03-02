import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  // Debugging: Log the cart products to inspect their structure
  console.log("Cart products:", cart.products);

  return (
    <div>
      {cart.products.map((product, index) => {
        let imageUrl = product.image;

        // If image is a string, extract the URL manually
        if (typeof product.image === "string") {
          const urlMatch = product.image.match(/url:\s*'([^']+)'/);
          imageUrl = urlMatch && urlMatch[1] ? urlMatch[1] : null;
        }

        return (
          <div
            key={index}
            className="flex items-start justify-between py-4 border-b"
          >
            <div className="flex items-start">
              <img
                src={
                  imageUrl || "https://via.placeholder.com/80x96?text=No+Image"
                }
                alt={product.name}
                className="w-20 h-24 object-cover mr-4 rounded"
                onError={(e) => {
                  // Prevent infinite loop by checking if src is already the placeholder
                  if (
                    e.target.src !==
                    "https://via.placeholder.com/80x96?text=Error"
                  ) {
                    e.target.src =
                      "https://via.placeholder.com/80x96?text=Error";
                    console.log(`Failed to load image: ${imageUrl}`);
                  }
                }}
              />
              <div>
                <h3>{product.name}</h3>
                <p className="text-sm text-gray-500">
                  size: {product.size} | color: {product.color}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        -1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="border rounded px-2 py-1 text-xl font-medium"
                  >
                    -
                  </button>
                  <span className="mx-4">{product.quantity}</span>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="border rounded px-2 py-1 text-xl font-medium"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <p>Rs {product.price.toLocaleString()}</p>
              <button
                onClick={() =>
                  handleRemoveFromCart(
                    product.productId,
                    product.size,
                    product.color
                  )
                }
              >
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;
