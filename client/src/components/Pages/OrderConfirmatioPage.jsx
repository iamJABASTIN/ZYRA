import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/slices/cartSlice"

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);
  
  useEffect(() => {
    if(checkout && checkout._id){
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate])

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#fff]">
      <h1 className="text-4xl font-bold text-colr text-emerald-700 mb-8">
        Thank you for your Order!
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            <div className="">
              <h2 className="text-xl font-semibold">
                Order ID: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Order date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="">
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          <div className="mb-20">
            {checkout.checkoutItems.map((item, index) => {
              let imageUrl = item.image;

              // If image is a string, extract the URL manually
              if (typeof item.image === "string") {
                const urlMatch = item.image.match(/url:\s*'([^']+)'/);
                imageUrl = urlMatch && urlMatch[1] ? urlMatch[1] : null;
              }
              // If image is an array (from your seed data), use the first image URL
              else if (Array.isArray(item.images) && item.images.length > 0) {
                imageUrl = item.images[0].url;
              }

              return (
                <div key={index} className="flex items-center mb-4">
                  <img
                    src={
                      imageUrl || "https://via.placeholder.com/80x96?text=No+Image"
                    }
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                    onError={(e) => {
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
                  <div className="">
                    <h4 className="text-md font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {item.color} | {item.size}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-md">Rs {item.price}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="">
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">PayPal</p>
            </div>
            <div>
              <h4 className="text-g font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},{""}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;