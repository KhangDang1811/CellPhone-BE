import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AddToCart} from '../../actions/CartAction'
import {Link} from 'react-router-dom'
import {formatPrice} from '../../untils/index'
import { message} from 'antd';

function Product(props) {
    const { product } = props;
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const success = () => {
        message.success({
            content: 'Thêm vào giỏ hàng thành công',
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

      const success1 = () => {
        message.warn({
            content: 'Sản phẩm đã có trong giỏ hàng',
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
    const  AddProductToCart = async (product) => {
        const action = AddToCart(product);
        //Items already in the cart are not added to the cart again 
        if(cartItems.find(item => item._id === product._id)){
            success1();
        }
        else{
        await dispatch(action);
        success()
        }
        
    }


    return (
        <div className="hotsale-listproduct-product">
            <Link to={"/detail/" + product._id}>
                <img src={product.image}></img>
                <p className="hotsale-listproduct-product-name">{product.name}</p>
                <div className="price">
                    <span className="price1">{formatPrice(product.salePrice)}đ</span>
                    <span className="price2">{formatPrice(product.price)}đ</span>
                </div>
            </Link>
            {
                product.percentDiscount >= 5 ? (<div className="discount">
                <p>{product.percentDiscount}%</p>
            </div>) : ''
            }
            {/* <div className="buy">
                <Link to="" onClick={(e) => {AddProductToCart(product)}}> Mua Ngay</Link>
            </div> */}
            {
                product.amount === 0 ? (<div className="buy">
                <Link to="" > Hết Hàng</Link>
            </div>) : (<div className="buy">
                <Link to="" onClick={(e) => {AddProductToCart(product)}}> Mua Ngay</Link>
            </div>)
    
            }
            </div>
    );
}

export default Product;