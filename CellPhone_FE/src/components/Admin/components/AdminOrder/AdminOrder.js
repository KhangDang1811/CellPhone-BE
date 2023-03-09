import React,{useState} from "react";
import "./AdminOrder.css";
import AdminOrderMenu from "./AdminOrderMenu/AdminOrderMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminOrderAll from "./AdminOrderAll/AdminOrderAll";

import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import { DownOutlined} from "@ant-design/icons";

function AdminOrder(props) {

  // const [month, setMonth] = useState({gte:"",lt:""});
  //  const handleMonth = (x,y) => {
  //   setMonth({gte:x,lt:y});
  // };

  // const [month, setMonth] = useState("");
  const [month, setMonth] = useState("");
  const handleMonth = (x) => {
    setMonth(x);
  };
 

  const menuShow = () => (
    <div className="menu-show">
      {/* <div className="menu-show-list">
        <div className="menu-show-item" onClick={() => handleMonth(new Date(2021,1,1),new Date(2021,1,31))}>Tháng 1</div>
        <div className="menu-show-item" onClick={() => handleMonth(new Date(2021,2,1),new Date(2021,2,28))}>Tháng 2</div>
        <div className="menu-show-item" onClick={() => handleMonth(new Date(2021,3,1),new Date(2021,3,31))}>Tháng 3</div>
        <div className="menu-show-item" onClick={() => handleMonth(new Date(2021,4,1),new Date(2021,4,30))}>Tháng 4</div>
        <div className="menu-show-item" onClick={() => handleMonth(new Date(2021,5,1),new Date(2021,5,31))}>Tháng 5</div>
        <div className="menu-show-item" onClick={() => handleMonth(new Date(2021,6,1),new Date(2021,6,30))}>Tháng 6</div>
        <div className="menu-show-item" onClick={() => handleMonth(new Date(2021,7,1),new Date(2021,7,31))}>Tháng 7</div>
        <div className="menu-show-item" onClick={() => handleMonth(new Date(2021,8,1),new Date(2021,8,30))}>Tháng 8</div>
        <div className="menu-show-item" onClick={() => handleMonth(new Date(2021,9,1),new Date(2021,9,31))}>Tháng 9</div>
        <div className="menu-show-item" onClick={() => handleMonth(new Date(2021,10,1),new Date(2021,10,30))}>Tháng 10</div>
        <div className="menu-show-item" onClick={() => handleMonth(new Date(2021,11,1),new Date(2021,11,31))}>Tháng 11</div>
        <div className="menu-show-item" onClick={() => handleMonth(new Date(2021,12,1),new Date(2021,12,10))}>Tháng 12</div>
      </div> */}
      <div className="menu-show-list">
      <div className="menu-show-item" onClick={() => handleMonth(0)}>All Order</div>
        <div className="menu-show-item" onClick={() => handleMonth(1)}>Tháng 1</div>
        <div className="menu-show-item" onClick={() => handleMonth(2)}>Tháng 2</div>
        <div className="menu-show-item" onClick={() => handleMonth(3)}>Tháng 3</div>
        <div className="menu-show-item" onClick={() => handleMonth(4)}>Tháng 4</div>
        <div className="menu-show-item" onClick={() => handleMonth(5)}>Tháng 5</div>
        <div className="menu-show-item" onClick={() => handleMonth(6)}>Tháng 6</div>
        <div className="menu-show-item" onClick={() => handleMonth(7)}>Tháng 7</div>
        <div className="menu-show-item" onClick={() => handleMonth(8)}>Tháng 8</div>
        <div className="menu-show-item" onClick={() => handleMonth(9)}>Tháng 9</div>
        <div className="menu-show-item" onClick={() => handleMonth(10)}>Tháng 10</div>
        <div className="menu-show-item" onClick={() => handleMonth(11)}>Tháng 11</div>
        <div className="menu-show-item" onClick={() => handleMonth(12)}>Tháng 12</div>
      </div>
    </div>
  );
  return (
    // <Router>
    //   <div className="order">
    //     <span>Orders</span>
    //     <AdminOrderMenu></AdminOrderMenu>

    //     <Switch>
    //       <Route path="/admin/order" exact component={AdminOrderAll}>
    //       </Route>
         
    //     </Switch>
    //   </div>
    // </Router>

    <div className="order">
        <span>Orders</span>
        {/* <div className="order-menu">
          <Link to="/admin/order">All Orders</Link>
        </div> */}

        <div className="filter-menu-item">
          <div className="order-menu">  
          <Dropdown overlay={()=>menuShow()} >
              <Link trigger={["click"]}>
               Tháng {month == 0 ? "All" : month} 
                <DownOutlined className="drop"/>
                </Link>  
          </Dropdown>
          </div>
        </div>

        <AdminOrderAll month={month}></AdminOrderAll>
      </div>
  );
}

export default AdminOrder;
