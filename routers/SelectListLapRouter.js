import express from "express";
import {
  createOptionByproperty,
  deleteSelectOption,
  getAllOptionByproperty,
  getSelectOptionById,
  UpdateSelectOption,
} from "../controllers/SelectListLapController.js";

const SelectListLaprouter = express.Router();

SelectListLaprouter.get("/", getAllOptionByproperty);
SelectListLaprouter.get("/detail/:id", getSelectOptionById);
SelectListLaprouter.delete("/delete/:id", deleteSelectOption);
SelectListLaprouter.post("/create", createOptionByproperty);
SelectListLaprouter.put("/update/:id", UpdateSelectOption);

export default SelectListLaprouter;
