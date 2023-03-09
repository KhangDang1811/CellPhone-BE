import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: 'none' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: 'none'}}
      onClick={onClick}
    />
  );
}

function Carousel(props) {
  let {slider, slider1, slider2} = props
 
  const [nav, setNav] = useState({nav1: null, nav2: null})

  useEffect(() => {
    setNav({
      nav1: slider1,
      nav2: slider2
    })
  }, [])

  const settings = {
    loop:true,
    dots: false,
    infinite: true,
     autoplay: true,
     autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

 
  const next = () =>  {
    slider1.slickNext();
  }
  const previous = () => {
   //console.log(slider2);
    slider2.slickPrev();
  }

  return (
    <section id="carousel">
      <div className="carousel">
        <div className="carousel-left">
          <div className="carousel-left-slide">
            <Slider asNavFor={nav.nav2}
                    ref={slider => (slider1 = slider)} 
                    {...settings} >
              <div key={1}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/ip12den-tet-690-300-max.png"></img>
              </div>
              <div key={2}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/OPPO_RENO6_Z_690x300.png"></img>
              </div>
              <div key={3}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/690x300_Powerport-III-Nano-20W-A2633.png"></img>
              </div>
              <div key={4}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/ASUS_FLIP_690x300.png"></img>
              </div>
              <div key={5}>
                <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/MLKK_VSMART_690x300.png"></img>
              </div>
            </Slider>
            <div className='carousel-left-move' onClick={() => previous()}>
                <div className="prev">
                    <LeftOutlined></LeftOutlined>
                </div>
                <div className="next" onClick={() => next()}>
                    <RightOutlined></RightOutlined>
                </div>
            </div>
          </div>
          <div className="carousel-left-bottom">
            <Slider asNavFor={nav.nav1}
                    ref={slider => (slider2 = slider)}
                    slidesToShow={4}
                    swipeToSlide={true}
                    focusOnSelect={true}
                  
                     >
              
              <div className="a1">
               IPHONE 13 PROMAX <br></br> Đu deal cùng Tết
              </div>
              <div className="a1">
               OPPO RENO6 Z 5G  <br></br>  Siêu sale đón Tết
              </div>
              <div className="a1">
              SẠC ANKER 20W  <br></br>  Sạc nhanh giá rẻ
              </div>
              <div className="a1">
              LAPTOP ASUS FLIP  <br></br>  Học tập lí tưởng
              </div>
              <div className="a1">
              MÁY LỌC VSMART   <br></br>   Quà Tết ý nghĩa
              </div>

            </Slider>
          </div>
        </div>
        <div className="carousel-right">
          <div className="carousel-right-item">
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/desk_690x300_right-banner_DienThoai.png"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/desk_690x300_right-banner_Laptop.png"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/desk_690x300_right-banner_Op-Balo.png"></img>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
