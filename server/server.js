import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/userRoutes.js";

const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);

app.get("/api/products", async (req, res) => {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  });

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
