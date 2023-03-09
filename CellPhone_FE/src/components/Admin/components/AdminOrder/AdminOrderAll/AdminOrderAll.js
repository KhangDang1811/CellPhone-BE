import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder, getAllOrderMonth } from "../../../../../actions/OrderAction";
import ListOrder from "../AdminOrderUI/ListOrder";
import NotFound from "./NotFound";

function AdminOrderAll(props) {
  const dispatch = useDispatch();
  const {month} = props;
 
   const orders = useSelector((state) => state.allOrder.order);
  //const orders = useSelector((state) => state.allOrder.orderMonth);
  //console.log("orderMonth",orders);
  const { orderGhnInfo } = useSelector((state) => state.orderGhn);
  const orderGhn = useSelector(state => state.orderGhn)
  

  // useEffect(() => {
  //    dispatch(getAllOrder());
  // }, []);
  
  //getAllOrderMonth(month)
  useEffect(() => {
    dispatch(getAllOrderMonth(month));
  }, [month]);


  return (
    <div>
      {orders && orders.length > 0 ? (
        <ListOrder orders={orders}></ListOrder>
      ) : (
        // <h4>Không có đơn hàng</h4>
        <NotFound/>
      )}
    </div>
  );
}

export default AdminOrderAll;
