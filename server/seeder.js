const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

//Function to seed data
const seedData = async () => {
  try {
    // Clear a default admin User
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a new admin User
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    //Assign the default user ID to each product

    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    //Insert the sample products to the database
    await Product.insertMany(sampleProducts);

    console.log("Product data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data:",error);
    process.exit(1);
  }
};

seedData();
