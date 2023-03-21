import express from "express";
import ProductRouter from './routes/products'
import mongoose from "mongoose";

const app = express();
app.use(express.json())

app.use('/api', ProductRouter)

mongoose.connect("mongodb://localhost:27017/assigment")
export const viteNodeApp = app