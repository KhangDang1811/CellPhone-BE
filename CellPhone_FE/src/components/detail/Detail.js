import React, { useEffect, useState } from 'react';
import './Detail.css'
import DetailInfo from './DetailInfo'
import RateStar from './RateStar';
import {
    useParams
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getproductById } from '../../actions/ProductAction';
import CommentProduct from './CommentProduct';
import BlogContent from './BlogContent';
import { LeftOutlined,RightOutlined } from '@ant-design/icons';
import Tskt from './Tskt';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Detail(props) {
    const dispatch = useDispatch()
    const { id } = useParams();
    const detailProduct = useSelector(state => state.getProductById.product)
    //console.log(detailProduct);
    useEffect(() => {
        dispatch(getproductById(id))
    }, [dispatch])

    const [index, setIndex] = useState(0)
    const image = detailProduct?.images[index]

    const checkIndex = (index) => {
        if (index > detailProduct.images.length - 1) {
            setIndex(0)
        } else if (index < 0) {
            setIndex(detailProduct.images.length - 1)
        } else {
            setIndex(index)
        }
    }

    const nextImage = () => {
        setIndex((index) =>{
            let newIndex = index + 1
            return checkIndex(newIndex);
        })
    }

    const prevImage = () => {
        setIndex((index) =>{
            let newIndex = index - 1
            return checkIndex(newIndex);
        })
    }

    const renderImage = (index1) => {
        setIndex(index1)
    }

    const settings = {
        infinite: true,
        slidesToShow: 5,
        swipeToSlide: true,
        className:"swippers"
      };

    return (
        <section id="detail">
            {
                detailProduct ? (
            <div className="detail">
                <div className="detail-title">
                    <h2>{detailProduct.name}</h2>
                </div>
                <div className="detail-info">
                    <div className="detail-info-slide">
            
                        <div className="detail-info-slide-image">
                            <img src={image || detailProduct.image}>
                            </img>
                          
                       <div className='carousel-left-move'>
                            <div className="prev">
                            <LeftOutlined  onClick={prevImage}></LeftOutlined>
                        </div>
                            <div className="next" >
                            <RightOutlined onClick={nextImage}></RightOutlined>
                            </div>
                        </div>
                        </div>
                     
                       <Slider {...settings}>
                       {/* <div className="swippers"> */}
                            {
                            detailProduct?.images.map((item, index1) => {
                                return<div key={index1} className={index1 == index ? "swipper1" : "swipper"}>
                                        <img onClick={() => renderImage(index1)} src={item}></img>
                                    </div>
                                
                            })}
                            {/* </div> */}
                        </Slider>

                      
                    </div>
                    <DetailInfo  product={detailProduct}></DetailInfo>
                   {
                       detailProduct.tskt.length > 0 ? (
                        <Tskt  product={detailProduct}/>
                       ) :("")
                   }
                </div>
                <div>
                    <BlogContent></BlogContent>
                </div>
                <div>
                    <RateStar></RateStar>
                </div>
                <div>
                    <CommentProduct></CommentProduct>
                </div>
                
            </div>
            ) : ''
            }
        </section>
    );
}

export default Detail;