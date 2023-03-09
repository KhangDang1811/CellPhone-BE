import React, { useState } from 'react'

function Tskt(props) {
    const { product } = props;
  // console.log(product.tskt);
    const [showMoreBlog, setShowMoreBlog] = useState(false);
    
    return (
        <div class="block-information__box-right">
            <div class="block-technical-info">
                <div class="box-title">
                    <h2 class="box-title__title">Thông số kỹ thuật</h2>
                </div>
                <div class="box-content">
                   {  
                        showMoreBlog ? product?.tskt.map((item,index) =>
                    <table id="tskt text">
                    <tbody className='body-tskt'>
                        <tr key={index} >
                            <th className={index % 2 == 0 ? "text-name color" : "text-name"}>{item.name}</th>
                            <th className={index % 2 == 0 ? "text-value color" : "text-value"}>{item.value}</th>
                          </tr> 
                    </tbody>
                     </table>
                    ) : product?.tskt.slice(0,10).map((item,index) =>
                    <table id="tskt text" >
                    <tbody  className='body-tskt'>
                        <tr>
                            <th className={index % 2 == 0 ? "text-name color" : "text-name"}>{item.name}</th>
                            <th className={index % 2 == 0 ? "text-value color" : "text-value"}>{item.value}</th>
                        </tr>
                    </tbody>
                     </table>
                    )
                   }
                </div>
                <div>
                    <button className="btn-more" onClick={() => setShowMoreBlog(!showMoreBlog)}>
                        {showMoreBlog ? "Thu gọn" : "Xem thêm"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Tskt
