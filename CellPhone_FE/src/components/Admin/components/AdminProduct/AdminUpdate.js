import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  getproductById,
  removeProductById,
  saveProduct,
  UpdateProduct,
} from "../../../../actions/ProductAction";
import { useHistory, useParams } from "react-router-dom";
import { getAllSelectList } from "../../../../actions/SelectListAction";
import FileBase from "react-file-base64"
import axios from "axios";

function AdminUpdate(props) {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  //console.log(id);
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const detailProduct = useSelector((state) => state.getProductById.product);
  const SelectList = useSelector((state) => state.selectList.List);
  const [activeTypeProduct, setActiveTypeproduct] = useState(undefined);
  const { List } = useSelector((state) => state.allTypeProduct);

  useEffect(() => {
    dispatch(getproductById(id));

    return () => {
      dispatch(removeProductById());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, []);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, []);

  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const [postData, setPostData] = useState({
    name:"",price:"",salePrice:"",type:"",image:"",amount:"",ram:""
  });

  const onSubmit = async (data) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append(
      "type",
      activeTypeProduct ? activeTypeProduct : detailProduct.type
    );
    formData.append("image", image);
    formData.append("_id", id);

    formData.append("os", data.os);
    formData.append("ram", data.ram);
    formData.append("battery", data.battery);
    formData.append("rom", data.rom);
    formData.append("camera", data.camera);
    formData.append("special", data.special);
    formData.append("design", data.design);
    formData.append("screen", data.screen);

    await dispatch(saveProduct(formData));
    history.push("/admin/product");
  };

  const MenuFirmProduct = (item) => (
    <div
      className={
        activeTypeProduct
          ? activeTypeProduct === item.name
            ? `filter-menu-firm-item active`
            : "filter-menu-firm-item"
          : detailProduct.type === item.name
          ? `filter-menu-firm-item active`
          : "filter-menu-firm-item"
      }
      onClick={() => HandleFilterProductByType(item.name)}
    >
      <img src={item.img}></img>
    </div>
  );

  const HandleFilterProductByType = (name) => {
    setActiveTypeproduct(name);
  };

  const HandleSubMit = (e) =>{
    e.preventDefault();
    dispatch(UpdateProduct(id,postData));
   //await axios.put(`http://localhost:5000/products/update/${id}`,postData)
    history.push("/admin/product");
  }

  return (
    <div className="admin-create">
      <span>Update Product</span>
      {detailProduct ? (
        <form
          className="admin-create-product"
         // onSubmit={handleSubmit(onSubmit)}
         onSubmit={HandleSubMit}
          encType="multipart/form-data"
        >
          <input
            {...register("name")}
            placeholder="Name"
            defaultValue={detailProduct.name}
            onChange={(e) => setPostData({...postData, name: e.target.value})}
          ></input>
          <input
            {...register("amount")}
            placeholder="Amount"
            type="number"
            defaultValue={detailProduct.amount}
            onChange={(e) => setPostData({...postData, amount: e.target.value})}
          ></input>
          <input
            {...register("price")}
            placeholder="Price"
            type="number"
            defaultValue={detailProduct.price}
            onChange={(e) => setPostData({...postData, price: e.target.value})}
          ></input>
          <input
            {...register("salePrice")}
            placeholder="SalePrice"
            type="number"
            defaultValue={detailProduct.salePrice}
            onChange={(e) => setPostData({...postData, salePrice: e.target.value})}
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

          {SelectList && SelectList.length > 0
            ? SelectList.slice(0,1).map((item) => (
                <div className="select-type">
                  <select
                    {...register(`${item.property}`)}
                    onChange={(e) => setPostData({...postData, ram: e.target.value})}
                    defaultValue={detailProduct[`${item.property}`]}
                  >
                    {item.options.map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </select>
                </div>
              ))
            : ""}

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
          <button type="submit">Update Product</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminUpdate;
