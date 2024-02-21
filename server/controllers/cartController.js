import Cart from '../models/Cart';
import Product from '../models/productModel';
import User from '../models/userModel';

export const getCartItems = async (req, res) => {
    const userId = req.params.id;
    try {
      let cart = await Cart.findOne({ userId });
      if (cart && cart.items.length > 0) {
        res.send(cart);
      } else {
        res.send(null);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  };
  
  export const addCartItem = async (req, res) => {
    const userId = req.params.userId; // Extract userId from the URL parameters
    console.log("User ID from cartController:", userId);
    const { productId, quantity } = req.body; // Assuming productId and quantity are sent in the request body
    console.log("Req body:" req.body);
    console.log("Req.params:"req.params);
  
    try {
      let cart = await Cart.findOne({ userId });
      let product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send({ error: 'Product not found!' });
      }
      const { price, name } = product;
  
      if (cart) {
        // if cart exists for the user
        let itemIndex = cart.items.findIndex((p) => p.productId == productId);
  
        // Check if product exists or not
        if (itemIndex > -1) {
          let productItem = cart.items[itemIndex];
          productItem.quantity += quantity;
          cart.items[itemIndex] = productItem;
        } else {
          cart.items.push({ productId, name, quantity, price });
        }
        cart.bill += quantity * price;
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        // no cart exists, create one
        const newCart = await Cart.create({
          userId,
          items: [{ productId, name, quantity, price }],
          bill: quantity * price,
        });
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  };
  
  export const deleteCartItem = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.itemId;
    try {
      let cart = await Cart.findOne({ userId });
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        cart.bill -= productItem.quantity * productItem.price;
        cart.items.splice(itemIndex, 1);
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  };
  