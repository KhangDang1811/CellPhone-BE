import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrderGhn,
  PrintOrderGhn,
} from "../../../../../actions/GhnAction";
import { deleteOrder, getAllOrder, ShippingOrder } from "../../../../../actions/OrderAction";
import {
  formatPrice,
  formatDateOrderPaypal,
} from "../../../../../untils/index";
import { ExportCSV } from "./Export";
import { message} from 'antd';
import {  UpdateProductDel } from "../../../../../actions/ProductAction";

function Order(props) {
  const { order } = props;

 const test = useSelector(state => state.orderGhn)
 
 const {orderGhnInfo,error} = test

  const dispatch = useDispatch();
 
  const {
    orderItems,
    totalPrice,
    paymentMethod,
    cancelOrder,
    shippingAddress,
    status,
    paymentResult,
    user,
  } = order;
 
  const handleShippingOrder = async (order) => {
    await dispatch(createOrderGhn(order._id)); // create order in giaohangnhanh
    await dispatch(ShippingOrder(order._id)); 
    dispatch(getAllOrder()); 
  };

  
  const handlePrintOrder = (order) => {
    //console.log(order);
    dispatch(PrintOrderGhn(order._id));
  };

  const handleDeleteOrder = async (order) => {
    const postData = orderItems.map((item) => ({id:item._id,qty:item.qty}) )
    await dispatch(UpdateProductDel(postData))
    await dispatch(deleteOrder(order._id))
    dispatch(getAllOrder())
  }

  const viewers = [
    {
      Name:shippingAddress.name,
      Phone:shippingAddress.phone,
      Province:shippingAddress.province,
      District:shippingAddress.district,
      Ward:shippingAddress.ward,
      Address:shippingAddress.detail},
  ]
  const fileName = `Đơn hàng của ${shippingAddress.name}`;
 
  const success = () => {
    message.success({
        content: `Gửi lời chúc tết thành công`,
        duration: 1,
        className: 'custom-class',
        style: {
            position: 'absolute',
            right: '2rem',
            top: '2rem',
            margin: '1rem 0'
        },
      });
  };
  const [ sent, setSent ] = useState(false)
  const sendMail = async (order) => {
    setSent(true)
    const gmail = `${user.email}`;
    try {
			await axios.post("http://localhost:5000/send_mail", {
				gmail,
			})
		} catch (error) {
			console.error(error)
		}
    success()
  }

  //set Date format dd\.mm\.YYYY 
  const date = formatDateOrderPaypal(order.createdAt);

  return (
    <>
      <div className="order-list">
        <div className="order-list-items">
          {orderItems.map((item) => (
            <div className="order-items-item">
              <span className="img">
                <img src={item.image}></img>
              </span>
              <span className="qty">Qty: {item.qty}</span>
              <span className="name">{item.name}</span>
              <span className="price">{formatPrice(item.salePrice)}</span>
            </div>
          ))}
        </div>
        <div className="toatalPrice">
          <span>Tổng tiền: {formatPrice(totalPrice)}</span>
        </div>
        <div className="order-info-address"> 
        <b>Đặt ngày :</b> {date}
        </div>
        <div className="order-info-address"> 
        <b>Tên người đặt : </b>
        {shippingAddress.name}
        </div>
        <div className="order-info-address"> 
        <b>Số điện thoại : </b>
        {shippingAddress.phone}
        </div>
        <div className="order-info">
          <div className="order-info-address">
            <b>Địa chỉ : </b> {"  "}
            {/* {shippingAddress.name},{""} */}
            {shippingAddress.province}, {shippingAddress.district},{"  "}
            {shippingAddress.ward}, {shippingAddress.detail}{" "}
           
          </div>
        </div>
        

        {paymentResult ? (
          <div className="order-payment-check">
            Paid : {formatDateOrderPaypal(paymentResult.update_time)}
          </div>
        ) : (
          ""
        )}

        <div className="order-bottom">
          {status === "shipping" ? (
            <div className="order-status">
              <span>
                Đã xác nhận{" "}
                {paymentMethod === "payOnline" ? (
                  <span>& Đã thanh toán</span>
                ) : (
                  ""
                )}
              </span>
            </div>
          ) : (
            ""
          )}

          <div className="order-button">
              {
                sent === false ? (
                  <button className="shipping"
                  onClick={() => sendMail(order)}
                  >Send Mail</button>
                ) : (<button className="shipping">Sent </button>)
              }
            {status === "pendding" && cancelOrder === false ? (
              <>
                <button
                  className="shipping"
                  onClick={() => handleShippingOrder(order)}
                >
                  Xác nhận đơn hàng
                </button>

              </>
            ) : (''
            )}

            {
              cancelOrder === true ? (<>
              <span> Khách yêu cầu hủy đơn </span>
                <button
                  className="shipping"
                  onClick={() => handleDeleteOrder(order)}
                >
                  Hủy đơn
                </button>

              </>) : ''
            }

            {status === "shipping" ? (
              <>
              <button
                className="shipping"
                onClick={() => handlePrintOrder(order)}
              >
                In đơn hàng
              </button>
               <ExportCSV  csvData={viewers} fileName={fileName}/>
               </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
