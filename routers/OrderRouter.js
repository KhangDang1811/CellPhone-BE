import express from 'express'
import {
  createOrder,
  GetAllOrder,
  DeleteOrder,
  ShippingProduct,
  GetAllOrderPendding,
  GetAllOrderShipping,
  GetAllOrderPaid,
  PaidProduct,
  GetOrderPenddingByUser,
  GetOrderShippingByUser,
  GetOrderPaidByUser,
  GetAllOrderPaypal,
  GetOrderPaypalByUser,
  updateOrder,
  PrintOrderGhn,
  clientCancelOrder,
  GetOrderByUser,
} from "../controllers/OrderController.js";
import {
  GetAllOrderInAMonth1,
  GetAllOrderInAMonth2,
  GetAllOrderInAMonth3,
  GetAllOrderInAMonth4,
  GetAllOrderInAMonth5,
  GetAllOrderInAMonth6,
  GetAllOrderInAMonth7,
  GetAllOrderInAMonth8,
  GetAllOrderInAMonth9,
  GetAllOrderInAMonth10,
  GetAllOrderInAMonth11,
  GetAllOrderInAMonth12,
} from "../controllers/OrderController.js";
import { isAuth, isAdmin } from "../untils/until.js";

const OrderRouter = express.Router();

OrderRouter.post("/create", createOrder);
OrderRouter.post("/update/:id", updateOrder);
OrderRouter.post("/cancel/:id", clientCancelOrder);
OrderRouter.get("/print/:id", PrintOrderGhn);
OrderRouter.put("/shipping/:id", ShippingProduct);
OrderRouter.put("/paid/:id", PaidProduct);
OrderRouter.delete('/delete/:id', DeleteOrder)

OrderRouter.get("/", GetAllOrder);
OrderRouter.get("/orderPaypal", GetAllOrderPaypal);
OrderRouter.get("/orderPendding", GetAllOrderPendding);
OrderRouter.get("/orderShipping", GetAllOrderShipping);
OrderRouter.get("/orderPaid", GetAllOrderPaid);

// --- Order In Month
OrderRouter.get("/allOrderInAMonth/0", GetAllOrder);
OrderRouter.get("/allOrderInAMonth/1", GetAllOrderInAMonth1);
OrderRouter.get("/allOrderInAMonth/2", GetAllOrderInAMonth2);
OrderRouter.get("/allOrderInAMonth/3", GetAllOrderInAMonth3);
OrderRouter.get("/allOrderInAMonth/4", GetAllOrderInAMonth4);
OrderRouter.get("/allOrderInAMonth/5", GetAllOrderInAMonth5);
OrderRouter.get("/allOrderInAMonth/6", GetAllOrderInAMonth6);
OrderRouter.get("/allOrderInAMonth/7", GetAllOrderInAMonth7);
OrderRouter.get("/allOrderInAMonth/8", GetAllOrderInAMonth8);
OrderRouter.get("/allOrderInAMonth/9", GetAllOrderInAMonth9);
OrderRouter.get("/allOrderInAMonth/10", GetAllOrderInAMonth10);
OrderRouter.get("/allOrderInAMonth/11", GetAllOrderInAMonth11);
OrderRouter.get("/allOrderInAMonth/12", GetAllOrderInAMonth12);

// --- user
OrderRouter.get("/:id", GetOrderByUser);
OrderRouter.get("/orderPaypal/:id", GetOrderPaypalByUser);
OrderRouter.get("/orderPendding/:id", GetOrderPenddingByUser);
OrderRouter.get("/orderShipping/:id", GetOrderShippingByUser);
OrderRouter.get("/orderpaid/:id", GetOrderPaidByUser);



export default OrderRouter