import express from "express";
import {
  createNewTypeProduct,
  deleteTypeProduct,
  getAllTypeProduct,
  NewTypeProduct,
} from "../controllers/ListTypeProductController.js";
import  {upload}  from "../untils/until.js";

const ListTypeProductRouter = express.Router();

ListTypeProductRouter.get("/", getAllTypeProduct);
ListTypeProductRouter.post(
  "/create",
  //upload.single("image"),
  createNewTypeProduct
);
ListTypeProductRouter.delete(
  "/delete/:id",
  deleteTypeProduct
);
ListTypeProductRouter.post("/newtype",NewTypeProduct)
export default ListTypeProductRouter;
