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

// @route PUT /api/cart
// @desc Update product quantity in the cart for a guest or logged-in user
// @access Public

router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      // Update the quantity of the product
      if (quantity > 0) {
        cart.products[productIndex].quantity = parseInt(quantity);
      } else {
        cart.products.splice(productIndex, 1); // Remove the product if quantity is 0
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) =>
          acc + (parseFloat(item.price) || 0) * (item.quantity || 1),
        0
      );
      await cart.save();

      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/cart
// @desc REMOVE a product from the cart
// @access Public

router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);

      cart.totalPrice = cart.products.reduce(
        (acc, item) =>
          acc + (parseFloat(item.price) || 0) * (item.quantity || 1),
        0
      );
      await cart.save();

      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/cart
// @desc Get logged-in user's or guest user's cart
// @access Public

router.get("/", async (req, res) => {
  const { guestId, userId } = req.query;

  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private

router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }
      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestProduct) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestProduct.productId.toString() &&
              item.size === guestProduct.size &&
              item.color === guestProduct.color
          );
          if (productIndex > -1) {
            // If the product already exists in the cart, update the quantity properly
            userCart.products[productIndex].quantity =
              parseInt(userCart.products[productIndex].quantity) +
              parseInt(guestProduct.quantity);
          } else {
            // Otherwise, Add new product
            userCart.products.push(guestProduct);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) =>
            acc + (parseFloat(item.price) || 0) * (item.quantity || 1),
          0
        );

        await userCart.save();

        // Remove the guest cart
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error removing guest cart", error);
        }
        res.status(200).json(userCart);
      } else {
        // If the user has no existing cart, assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        // Guest cart has already been merged return user cart
        return res.status(200).json(userCart);
      }
      res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
