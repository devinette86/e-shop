import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
