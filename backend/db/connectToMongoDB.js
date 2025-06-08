import Mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await Mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to mongodb", error.message);
  }
};

export default connectToMongoDB;
