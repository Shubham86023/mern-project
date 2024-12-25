import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoute from './routes/ProductRoute.js'; 
import path from "path";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use("/product/" , productRoute);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/Frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at ${process.env.BASE_URL}`);
})

