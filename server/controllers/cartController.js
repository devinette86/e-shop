import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("cart.product");

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Return the cart items
    res.json(user.cart);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const addCartItem = async (req, res) => {
  const { userId } = req.params; // Extract userId from the URL parameters
  console.log("User ID from cartController:", userId);
  const { productId, quantity } = req.body; // Assuming productId and quantity are sent in the request body
  console.log("Req.body from cartController:", req.body);
  console.log("Req.params from cartController:", req.params);

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }

    // Check if the product is already in the user's cart
    const existingCartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      existingCartItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add a new item
      user.cart.push({
        product: productId,
        quantity,
      });
    }

    // Save the user with the updated cart
    await user.save();
    await user.populate("cart.product");
    return res.status(201).json(user.cart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Check if the item exists in the user's cart
    const existingCartItemIndex = user.cart.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (existingCartItemIndex === -1) {
      return res.status(404).json({ error: "Item not found in the cart!" });
    }

    // Remove the item from the cart array
    user.cart.splice(existingCartItemIndex, 1);

    // Save the user with the updated cart
    await user.save();
    await user.populate("cart.product");
    return res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

