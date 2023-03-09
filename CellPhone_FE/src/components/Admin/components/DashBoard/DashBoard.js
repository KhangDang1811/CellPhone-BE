import React from "react";
import {
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./DashBoard.css";
import ChartDashBoard from "./ChartDashBoard";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../../untils";

export default function DashBoard() {
  const orders = useSelector((state) => state?.allOrder?.order);
  
  
  // const total = orders.map((order) => {
  //   return order.totalPrice
  //   }).reduce((total, num) => total + num, 0);
  
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;

  return (
    <section id="dashboard">
      <div className="dashboard">
        <div className="dashboard-top">
          <div className="dashboard-top-search">
            <form>
              <input placeholder="Search ..."></input>
              <span>
                <SearchOutlined></SearchOutlined>
              </span>
            </form>
          </div>
          <div className="dashboard-top-content">
            <li className="dashboard-top-content-avatar">
              <img src={userInfo?.profilepicture ? userInfo?.profilepicture : ""}></img>
              <span>DangKhang</span>
            </li>
            <li className="dashboard-top-content-bell">
              <BellOutlined></BellOutlined>
            </li>
          </div>
        </div>

        <div className="dashboard-middle">
          <div className="dashboard-middle-statistic">
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <ShoppingOutlined></ShoppingOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">2</span>
                  <span className="title">Total Sales</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <ShoppingCartOutlined></ShoppingCartOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">25</span>
                  <span className="title">Daily Visits</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <DollarCircleOutlined></DollarCircleOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  {/* <span className="total">{formatPrice(totalPrice)}</span> */}
                  <span className="total">9.999.999</span>
                  <span className="title">Total Income</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <FileTextOutlined></FileTextOutlined>
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">{orders?.length}</span>
                  <span className="title">Total Orders</span>
                </div>
              </li>
            </div>
          </div>
          <ChartDashBoard></ChartDashBoard>
        </div>

        <div className="dashboard-new">
          <div className="dashboard"></div>
          <div className="dashboard"></div>
        </div>
      </div>
    </section>
  );
}
