import mongoose from "mongoose";

export default async function connectDB() {
    await mongoose.connect(process.env.MONGO_ATLAS_URL)
        .then(() => console.log("Connected to DB"))
        .catch((err) => console.log("Error in connecting to DB : ", err));
}