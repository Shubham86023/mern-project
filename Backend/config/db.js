import mongoose from "mongoose";

export const connectDB = async () => {

    try{
        if(mongoose.connection.readyState === 1) return;
        
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(0);
    }
}
