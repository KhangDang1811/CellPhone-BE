import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CreateNewTypeProduct, getAllTypeProduct } from "../../../../../actions/ListTypeProductAction";
import FileBase from "react-file-base64"
import { message} from 'antd';

export default function CreateNewType() {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const [image, setImage] = useState("");

  const onSubmit = async (data, e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", image);

    e.target.reset();
    await dispatch(CreateNewTypeProduct(formData));
    dispatch(getAllTypeProduct())
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const [postData, setPostData] = useState({
    name:"",img:""
  });

  const success = () => {
    message.success({
        content: `Thêm type thành công`,
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

  const HandleSubMit = (e) =>{
    e.preventDefault();
    dispatch(CreateNewTypeProduct(postData));
    success();
   dispatch(getAllTypeProduct())
   setPostData({name:"",img:""})
   window.location.reload();
  }
  return (
    <div className="create-type">
      <span>Create new type product</span>
      <form onSubmit={HandleSubMit}>
        <input {...register("name")} placeholder="Name ... "
        onChange={(e) => setPostData({...postData, name: e.target.value})}
        ></input>

        {/* <input type="file" onChange={(e) => handleChangeImage(e)}></input> */}
        <FileBase
          type="file"
          multiple={false}
          onDone={({base64}) => setPostData({ ...postData,img:base64})}
          />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
