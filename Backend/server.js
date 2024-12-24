import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoute from './routes/Product.route.js'; 

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/product/" , productRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
})

