import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

async function Main() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MongoDB URI is missing! Check your .env file.");
        }
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ Database Connected Successfully");
    } catch (error) {
        console.error("❌ Error Connecting DB:", error.message);
    }
}

export default Main;
