import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    nanoId: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    visits: [{ timeStamp: { type: Date } }],
  },
  { timestamps: true }
);

export default mongoose.model("url", urlSchema);
