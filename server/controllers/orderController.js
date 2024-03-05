import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save();
      res.status(201).json({
        message: 'Order is created successfully.',
        product: savedOrder
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };