import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ListTypeProductLapSchema = new Schema(
  {
    name: String,
    img: String,
    cloudinary_id: String,
  },
  {
    timestamps: true,
  }
);

export const ListTypeProductLapModel = mongoose.model(
  "ListTypeproductLap",
  ListTypeProductLapSchema
);
