import { OrderModel } from "../models/OrderModel.js";
import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
let config = {
  headers: {
    "Content-Type": "application/json",
    'Token': "238e3e39-63f9-11ec-ac64-422c37c6de1b",
    'ShopId':"84541"
  },
};

export const createOrder = expressAsyncHandler(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "cart is emty" });
  } else {
    const order = new OrderModel({
      order_code: "",
      to_ward_code: req.body.to_ward_code,
      to_district_id: req.body.to_district_id,
      cancelOrder: false,
      statusCancel: false,
      orderItems: req.body.orderItems,
      shippingAddress: {
        province: req.body.shippingAddress.province,
        district: req.body.shippingAddress.district,
        ward: req.body.shippingAddress.ward,
        detail: req.body.shippingAddress.more,
        name: req.body.shippingAddress.name,
        phone: req.body.shippingAddress.phone,
      },
      paymentMethod: req.body.paymentMethod,
      paymentResult: req.body.paymentResult
        ? {
            id: req.body.paymentResult.id,
            status: req.body.paymentResult.status,
            update_time: req.body.paymentResult.update_time,
            email_address: req.body.paymentResult.payer.email_address,
          }
        : "",
      totalPrice: req.body.totalPrice,
      status: req.body.status ? req.body.status : "pendding",
      name: req.body.name,
      user: req.body.user,
    });

    const createOrder = await order.save();
    res.status(201).send({ message: "new order created", order: createOrder });
  }
});

export const clientCancelOrder = expressAsyncHandler(async (req, res) => {
  const updateOrder = await OrderModel.findById({_id: req.params.id})

   if(updateOrder){
    updateOrder.cancelOrder = true
    await updateOrder.save()
   }
   res.send(updateOrder)
});

export const updateOrder = expressAsyncHandler(async (req, res) => {

  let updateOrder = await OrderModel.findById({_id:req.params.id});
  console.log(req.params.id);
  if (updateOrder) {
    let items = [];
    updateOrder.orderItems.map((x) => {
      let item = {};
      item.name = x.name;
      item.quantity = parseInt(x.qty);
      item.price = x.salePrice;

      items.push(item);
    });
    const orderGhn = {
      payment_type_id: 2,
      return_phone:  updateOrder.shippingAddress.phone,
      return_address: updateOrder.shippingAddress.detail,
      return_district_id: null,
      return_ward_code: "",
      client_order_code: "",

      to_name: updateOrder.name,
      to_phone: updateOrder.shippingAddress.phone,
      to_address: `${updateOrder.shippingAddress.province}, ${updateOrder.shippingAddress.district}, ${updateOrder.shippingAddress.ward}, ${updateOrder.shippingAddress.detail}`,
      to_ward_code: updateOrder.to_ward_code,
      to_district_id: updateOrder.to_district_id,

      weight: 200,
      length: 1,
      width: 19,
      height: 10,

      service_id: 0,
      service_type_id: 2,
      pick_station_id: 1444,
      note: "",
      required_note: "KHONGCHOXEMHANG",

      cod_amount: updateOrder.paymentMethod === "payOnline" ? 0 : updateOrder.totalPrice,
      items,
    };

    try {
      const { data } = await axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
        orderGhn,config
        // {
        //   headers: {
        //     ContentType: "application/json",
        //     ShopId: process.env.SHOP_ID,
        //     Token: process.env.TOKEN_GHN,
        //   },
        // }
      );
      // console.log("data",data);
      const order_code = data.data.order_code;
      console.log("order_code: ", order_code);

      updateOrder.order_code = order_code;
      await updateOrder.save();
      res.send(updateOrder);
    } catch (error) {
      console.log("error",  error.response.data);
      res.status(401).send({message: error.response.data.code_message_value});
    }
  } else {
    res.send({ msg: "product not found" });
  }
});

export const PrintOrderGhn = expressAsyncHandler(async (req, res) => {
  console.log('print order')
  const Order = await OrderModel.findById({ _id: req.params.id });
  if (Order) {
    let token ;
    try {
      const { data } = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token",
        {
          headers: {
            Token:process.env.TOKEN_GHN,
          },
          params: {
            order_codes: Order.order_code,
          },
        }
      );

      token = data.data.token;
      Order.token = token;
      //console.log(Order, token);
      await Order.save();

      const result = await axios.get(
        `https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${token}`,
        config
        // {
        //   headers: {
        //     Token:process.env.TOKEN_GHN,
        //   },
        // }
      );
      //console.log("result: ", result.config.url);

      res.send(result.config.url);
    } catch (error) {
      console.log(error);
    }
    
  } else {
    res.send({message: 'order not found'})
  }
});


export const GetAllOrder = expressAsyncHandler(async (req, res) => {
  //await OrderModel.remove()
  const Order = await OrderModel.find({})
  .populate('user', 'email')
  .sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

export const GetAllOrderPaypal = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({ paymentMethod: "payOnline" }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

 
export const GetAllOrderPendding = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({ 
    $or: [{ status: "pendding" }, { paymentMethod: "payOnline" }] ,
  }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

export const GetAllOrderShipping = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({ status: "shipping" }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

export const GetAllOrderPaid = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({ status: "paid" }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

//GetAllOrderCancel
export const GetAllOrderCancel = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({ statusCancel: "true" }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

export const DeleteOrder = expressAsyncHandler(async (req, res) => {
  
  const deleteOrder = await OrderModel.findById({_id: req.params.id});
  const statusCancel = "true";
  if (deleteOrder) {
    // await deleteOrder.remove();
    deleteOrder.statusCancel = statusCancel;
    await deleteOrder.save();
    res.send({ message: "product deleted" });
  } else {
    res.send("error in delete order");
  }
});

export const ShippingProduct = expressAsyncHandler(async (req, res) => {
  console.log("shipping");
  const status = "shipping";
  const Order = await OrderModel.findById({ _id: req.params.id });
  if (Order) {
    Order.status = status;
    await Order.save();
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

export const PaidProduct = expressAsyncHandler(async (req, res) => {
  console.log("paid");
  const status = "paid";
  const Order = await OrderModel.findByIdAndUpdate(
    { _id: req.params.id },
    { status: status }
  );
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

// --------------------    user

export const GetOrderByUser = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({ user: req.params.id }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
});

export const GetOrderPaypalByUser = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    user: req.params.id,
    paymentMethod: "payOnline",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
});

export const GetOrderPenddingByUser = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    user: req.params.id,
    statusCancel: "false",
    status: "pendding",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
});

export const GetOrderShippingByUser = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    user: req.params.id,
    status: "shipping",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
});

export const GetOrderPaidByUser = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    user: req.params.id,
    status: "paid",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
});

export const GetOrderCancelByUser = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    user: req.params.id,
    statusCancel: "true",
  }).sort({ createdAt: -1 });
  if (Order) {
    //update timestamp cancel order equal time now

    res.send(Order);
  } else {
    res.status(401).send({ message: "no order cancel by user" });
  }
});

export const GetAllOrderInAMonth1 = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2022, 0, 1),
      $lt: new Date(2022, 0, 31),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
  
  
});

export const GetAllOrderInAMonth2 = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2022, 1, 1),
      $lt: new Date(2022, 1, 28),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
});
export const GetAllOrderInAMonth3 = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2022, 2, 1),
      $lt: new Date(2022, 2, 31),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
});
export const GetAllOrderInAMonth4 = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2022, 3, 1),
      $lt: new Date(2022, 3, 30),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
});
export const GetAllOrderInAMonth5 = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2022, 4, 1),
      $lt: new Date(2022, 4, 31),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
});
export const GetAllOrderInAMonth6 = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2022, 5, 1),
      $lt: new Date(2022, 5, 31),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
});
export const GetAllOrderInAMonth7 = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2022, 6, 1),
      $lt: new Date(2022, 6, 30),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
});
export const GetAllOrderInAMonth8 = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2022, 7, 1),
      $lt: new Date(2022, 7, 31),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
});
export const GetAllOrderInAMonth9 = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2022, 8, 1),
      $lt: new Date(2022, 8, 30),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
});
export const GetAllOrderInAMonth10 = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2022, 9, 1),
      $lt: new Date(2022, 9, 31),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
});
export const GetAllOrderInAMonth11 = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2022, 10, 1),
      $lt: new Date(2022, 10, 30),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
});
export const GetAllOrderInAMonth12 = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2022, 11, 1),
      $lt: new Date(2022, 11, 31),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
});