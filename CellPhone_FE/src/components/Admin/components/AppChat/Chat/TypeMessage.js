import React, {useEffect, useRef, useState} from "react";
import {CameraOutlined, CloseOutlined} from '@ant-design/icons';
import { useSelector } from "react-redux";


function TypeMessage(props) {
  const { onSubmit ,socket , idConversation} = props;
  
  const [value, setValue] = useState("");
  const [media, setMedia] = useState(null);

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!onSubmit && value === "" && media == null) return;

    // onSubmit(value);
    if(value !== ""){
      onSubmit(value);
      setValue("");
    }
    
    if(media !== null){
      onSubmit(media.content)
      setMedia(null);
    }
  };

  const timer = useRef();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;

 
  return (
    <form onSubmit={handleFormSubmit} className="ad-chatuser-typemessage">
       {
              media && media.image ? (
                <>
                <img className="image" src={media?.content} alt={media.name} />
                <CloseOutlined 
                  onClick={() => setMedia(null)}
                className="icon-close" />
                </>
              ) : null
            }
      
      <input
        placeholder="Type a message"
        type="text"
        value={value}
        onChange={handleValueChange}
        onKeyDown={(e) => {
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => {
            socket?.emit("typing", {
              userId: userInfo._id,
              isTyping: true,
              conversationId: idConversation,
              sender: userInfo.name,
            });
          }, 800);
        }}
      />
       <label htmlFor="file" className="label">
         <CameraOutlined className="camera"/>
              <input
                className="file"
                id="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = function () {
                   // console.log("file",reader.result);
                    setMedia({
                      image: true,
                      name: file.name,
                      content: reader.result,
                    });
                  };
                  reader.onerror = function (error) {
                    console.log(error);
                  };
                }}
                type="file"
                accept="image/*"
                multiple
              />
            </label >
      <button type="submit">Gửi</button>
    </form>
  );
}

export default TypeMessage;
