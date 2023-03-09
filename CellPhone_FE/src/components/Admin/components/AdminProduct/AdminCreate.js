import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import {
  editCurrentPage,
  saveProduct,
} from "../../../../actions/ProductAction";
import { useHistory } from "react-router-dom";
import { getAllSelectList } from "../../../../actions/SelectListAction";
import { getAllTypeProduct } from "../../../../actions/ListTypeProductAction";
import FileBase from "react-file-base64"
import { message} from 'antd';
import {CloseOutlined } from '@ant-design/icons';

function AdminCreate(props) {
  const { register, handleSubmit } = useForm({ defaultValues: {} });
  const dispatch = useDispatch();
  const history = useHistory();

  //const [image, setImage] = useState("");
  const [activeTypeProduct, setActiveTypeproduct] = useState("");
  const SelectList = useSelector(state => state.selectList.List)
  //console.log(SelectList);
  const { pages } = useSelector((state) => state.allProduct.product);
  //const { List } = useSelector((state) => state.allTypeProduct);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTypeProduct());
  }, [dispatch]);

  // const handleFileImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };


  // const onSubmit = async (data) => {
  //   let formData = new FormData();

  //   formData.append("name", data.name);
  //   formData.append("price", data.price);
  //   formData.append("amount", data.amount);
  //   formData.append("salePrice", data.salePrice);
  //   formData.append("type", activeTypeProduct);
  //   formData.append("image", image);

  //   formData.append("os", data.os);
  //   formData.append("ram", data.ram);
  //   formData.append("battery", data.battery);
  //   formData.append("rom", data.rom);
  //   formData.append("camera", data.camera);
  //   formData.append("special", data.special);
  //   formData.append("design", data.design);
  //   formData.append("screen", data.screen);

  //   await dispatch(saveProduct(formData));
  //   await dispatch(editCurrentPage(pages));
  //   history.push("/admin/product");
  // };

  const [postData, setPostData] = useState({
    name:"",price:"",salePrice:"",type:"",image:"",amount:"",ram:"",battery: "",
    ram: "",
    color:"",
    camera: "",
    special: "",
    design: "",
    screen: "",
  });

  const closeImage =() =>{
    postData.image = "";
    setPostData({...postData});
  }
  
  const success = () => {
    message.success({
        content: `Thêm sản phẩm thành công`,
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

  const handleSubmit1 = () =>{
    //e.preventDefault();
    success()
    dispatch(saveProduct(postData));
    dispatch(editCurrentPage(pages));
    history.push("/admin/product");
  }

  // const MenuFirmProduct = (item) => (
  //   <div {...register(`${item.name}`)}
  //     className={
  //       activeTypeProduct === item.name
  //         ? `filter-menu-firm-item active`
  //         : "filter-menu-firm-item"
  //     }
  //     onClick={() => HandleFilterProductByType(item.name)}
  //     onChange={(e) => setPostData({...postData, type: e.target.value})}
  //   >
  //     <img src={item.img}  onChange={(e) => setPostData({...postData, type: e.target.value})}></img>
  //   </div>
  // );

 

  // const HandleFilterProductByType = (name) => {
  //   setActiveTypeproduct(name);
  // };
  
  return (
    <div className="admin-create">
      <span>Create Product</span>
      <form
        className="admin-create-product"
        //onSubmit={handleSubmit(onSubmit)}
        onSubmit={handleSubmit(handleSubmit1)}
        encType="multipart/form-data"
      >
        <input 
        {...register("name")} placeholder="Name"
        onChange={(e) => setPostData({...postData, name: e.target.value})}
        ></input>
        <input
          {...register("amount")}
          placeholder="Amount"
          type="number"
          onChange={(e) => setPostData({...postData, amount: e.target.value})}
        ></input>
        <input {...register("price")} placeholder="SalePrice" type="number"
         onChange={(e) => setPostData({...postData, salePrice: e.target.value})}
        ></input>
        <input
          {...register("salePrice")} placeholder="price"
          type="number"
          onChange={(e) => setPostData({...postData, price: e.target.value})}
        ></input>
         <input
          placeholder="type"
          onChange={(e) => setPostData({...postData, type: e.target.value})}
        ></input>
          
        {/* <div className="filter-menu-firm">
          {
            List ? (List.map((item) => MenuFirmProduct(item))) : ''
          }
        </div> */}



        {/* <input
          type="file"
          {...register("image")}
          onChange={handleFileImageChange}
        ></input> */}
       
        <FileBase
        
          type="file"
          multiple={false}
          onDone={({base64}) => setPostData({ ...postData,image:base64})}
        />
       

        {/* <FileBase
          type="file"
          multiple={false}
          onDone={({base64}) => setPostData({ ...postData,image:base64})}
        /> */}
        {
          postData.image && 
         (  <div>
          <img className="show_image" src={postData.image} alt=""></img>
          <CloseOutlined className="close_show_image" onClick={() => closeImage()}/>
          </div>
         )
        }
       
        <button type="submit"
          //onClick={HandleSubMit}
        >Add Product</button>
      </form>
    </div>
  );
}

export default AdminCreate;
