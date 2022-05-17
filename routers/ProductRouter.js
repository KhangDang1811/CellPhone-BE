import express from 'express'
import {
  getAllProduct,
  filterProductByType,
  findProductById,
  AddProduct,
  DeleteProduct,
  CommentProduct,
  UpdateProduct,
  SearchProduct,
  paginationProduct,
  RateProduct,
  RepCommentProduct,
  BlogProduct,
  PinCommentProduct,
  filterProductByRandomField,
  ChangeLikesComment,
  UpdateAmountProduct,
  UpdateAmountProductDel,
} from "../controllers/ProductController.js";
import { isAuth, isAdmin } from "../untils/until.js";
import { upload } from "../untils/until.js";

const ProductRouter = express.Router();

ProductRouter.get("/:type", filterProductByType);
ProductRouter.post("/filter/random", filterProductByRandomField);
ProductRouter.get("/detail/:id", findProductById);
ProductRouter.get("/", getAllProduct);
ProductRouter.get("/pagination/:page", paginationProduct);

ProductRouter.post("/rate/:id", RateProduct);
ProductRouter.post("/comment/:id", CommentProduct);
ProductRouter.post("/pin/comment/:id", PinCommentProduct);
ProductRouter.post("/rep/comment/:id", RepCommentProduct);

// ProductRouter.post(
//   "/create",
//   isAuth,
//   isAdmin,
//   upload.single("image"),
//   AddProduct
// );
ProductRouter.post(
  "/create",
  AddProduct
);
ProductRouter.put(
  "/update/:id",
  // isAuth,
  // isAdmin,
  // upload.single("image"),
  UpdateProduct
);
ProductRouter.post(
  "/blog/:id",
  isAuth,
  isAdmin,
  BlogProduct
);
ProductRouter.delete(
  "/delete/:id",
  // isAuth,
  // isAdmin,
  // upload.single("image"),
  DeleteProduct
);
ProductRouter.put("/:id/changelikes",ChangeLikesComment)
ProductRouter.put("/updateDel",UpdateAmountProductDel)
ProductRouter.put("/amount",UpdateAmountProduct)
ProductRouter.get('/search/product', SearchProduct)

export default ProductRouter