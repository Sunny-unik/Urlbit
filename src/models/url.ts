import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    nanoId: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    visits: { type: [{ timeStamp: { type: Date } }], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("urls", urlSchema);
