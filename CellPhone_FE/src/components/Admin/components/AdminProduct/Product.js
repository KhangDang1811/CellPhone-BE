import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteProduct,
  paginationProduct,
} from "../../../../actions/ProductAction";
import { useHistory, Link } from "react-router-dom";
import { formatPrice } from "../../../../untils/index";
import { DeleteOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import LoadingBox from '../../../Loading/LoadingBox';
import { message} from 'antd';

function Product(props) {
  const { product, number } = props;
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.allProduct.currentPage);
  const currentPage1 = useSelector((state) => state.allProduct.loading);
  
  const success = () => {
    message.success({
        content: `Xóa ${product.name} thành công`,
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

  const handleDeleteProduct = async (product) => {
    await dispatch(DeleteProduct(product._id));
    success()
    dispatch(paginationProduct(currentPage));

  };

  return (
    <tr>
      {/* <td>{number + 1}</td>
      <td>
        <img src={product.image}></img>
      </td>
      <td>{product.name}</td>
      <td>{formatPrice(product.salePrice)}</td>
      <td>{product.type}</td>
      <td
        className="delete-product"
        onClick={(e) => handleDeleteProduct(product)}
      >
        <DeleteOutlined />
      </td>
      <td className="update-product">
        <Link to={`/admin/product/update/${product._id}`}>
          <EditOutlined></EditOutlined>
        </Link>
      </td>
      <td className="review-product">
        <Link to={`/admin/product/reviewProduct/${product._id}`} >
          <FormOutlined></FormOutlined>
        </Link>
      </td> */}
      {
        currentPage1 ? (<LoadingBox/>) : currentPage1 ? (<LoadingBox/>) : (
          <>
            <td>{number + 1}</td>
      <td>
        <img src={product.image}></img>
      </td>
      <td>{product.name}</td>
      <td>{formatPrice(product.salePrice)}</td>
      <td>{product.type}</td>
      <td
        className="delete-product"
        onClick={(e) => handleDeleteProduct(product)}
      >
        <DeleteOutlined />
      </td>
      <td className="update-product">
        <Link to={`/admin/product/update/${product._id}`}>
          <EditOutlined></EditOutlined>
        </Link>
      </td>
      <td className="review-product">
        <Link to={`/admin/product/reviewProduct/${product._id}`} >
          <FormOutlined></FormOutlined>
        </Link>
      </td></>
        )
      }
    </tr>
  );
}

export default Product;
