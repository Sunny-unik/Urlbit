import mongoose from "mongoose";

export default function ConnectDB() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) return console.log("MongoUri not found");
  mongoose
    .connect(mongoUri + "?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("Error on connecting MongoDB:", err));
}
