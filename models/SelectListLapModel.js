import mongoose from "mongoose";

const Schema = mongoose.Schema

const SelectListLap = new Schema(
  {
    name: String,
    property: String,
    options: Array,
  },
  {
    timestamp: true,
  }
);

export const SelectListLapModel = mongoose.model("SelectListLap", SelectListLap);
