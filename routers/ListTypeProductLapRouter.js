import express from "express";
import {
  createNewTypeProduct,
  deleteTypeProduct,
  getAllTypeProduct,
  NewTypeProduct,
} from "../controllers/ListTypeProductLapController.js";
import  {upload}  from "../untils/until.js";

const ListTypeProductLapRouter = express.Router();

ListTypeProductLapRouter.get("/", getAllTypeProduct);
ListTypeProductLapRouter.post(
  "/create",
  //upload.single("image"),
  createNewTypeProduct
);
ListTypeProductLapRouter.delete(
  "/delete/:id",
  deleteTypeProduct
);
ListTypeProductLapRouter.post("/newtype",NewTypeProduct)

export default ListTypeProductLapRouter;
