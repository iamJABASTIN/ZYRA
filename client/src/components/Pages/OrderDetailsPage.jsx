import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No order details found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{orderDetails._id}
              </h3>
              <p className="text-gray-60">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Approved" : "Pending"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
              </span>
            </div>
          </div>
          {/* Customer, Payment, Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping Method: {orderDetails.shippingMethod || "N/A"}</p>
              <p>
                Address:{" "}
                {orderDetails.shippingAddress
                  ? `${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`
                  : "N/A"}
              </p>
            </div>
          </div>
          {/* Product List */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Unit Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => {
                  // Extract image URL from the images array
                  let imageUrl = item.images?.[0]?.url;

                  // Fallback if image is a string (for robustness)
                  if (typeof item.image === "string") {
                    const urlMatch = item.image.match(/url:\s*'([^']+)'/);
                    imageUrl = urlMatch && urlMatch[1] ? urlMatch[1] : null;
                  }

                  return (
                    <tr key={item.productId} className="border-b">
                      <td className="py-2 px-4 flex items-center">
                        <img
                          src={
                            imageUrl || "https://via.placeholder.com/80x96?text=No+Image"
                          }
                          alt={item.images?.[0]?.altText || item.name || "Product"}
                          className="w-12 h-12 object-cover rounded-lg mr-4"
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
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-blue-500 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="py-2 px-4">Rs {item.price}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">
                        Rs {item.price * item.quantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Back to orders link */}
          <Link to="/my-orders" className="text-blue-500 hover:underline">
            Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;