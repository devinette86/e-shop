import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import Order from "./models/orderModel.js";

import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);



const port = process.env.PORT;

connectDB();

const app = express();

app.use('/cart', (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.get("/api/products", async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const products = await Product.find(filter);
  res.json(products);
});

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.post("/create-checkout-session", async (req, res) => {
  try {
    console.log(req.body)
 
 
    const { products } = req.body;
 
 
    const lineItems = products.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.product.name, // You can adjust the property names as needed
          images: [item.product.imageUrl],
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));
 
 
    const session = await stripeInstance.checkout.sessions.create({  
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/order-confirmation`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });
 
 
    res.json({ id: session.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
 });
 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



