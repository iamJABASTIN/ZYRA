const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper function to get a cart for a user ID or guest ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged-in user
// @access Public

router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const price = parseFloat(product.price) || 0;
    const qty = parseInt(quantity) || 1;

    // Determine if the user is logged in or guest
    let cart = await getCart(userId, guestId);

    // If the cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // If the product already exists in the cart, update the quantity properly
        cart.products[productIndex].quantity =
          parseInt(cart.products[productIndex].quantity) + qty;
      } else {
        // Add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0],
          price: price,
          size,
          color,
          quantity: qty,
        });
      }

      // Recalculate the total price safely
      const newTotalPrice = cart.products.reduce(
        (acc, item) =>
          acc + (parseFloat(item.price) || 0) * (item.quantity || 1),
        0
      );

      cart.totalPrice = isNaN(newTotalPrice) ? 0 : newTotalPrice;

      await cart.save();

      return res.status(200).json(cart);
    } else {
      // Create a new cart for the guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0],
            price: price,
            size,
            color,
            quantity: qty,
          },
        ],
        totalPrice: price * qty,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
