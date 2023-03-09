import React, {useEffect, useState} from "react";
import {CameraOutlined, CloseOutlined} from '@ant-design/icons';
import { playSound } from "../../../../untils/Notificationsound";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { getAllConversationList } from "../../../../actions/ChatAction";

function TypeMessage(props) {
  const { onSubmit ,socket} = props;
 
  const [value, setValue] = useState("");

  const [media, setMedia] = useState(null);
  

  const handleValueChange = (e) => {
    setValue(e.target.value);
    //playSound("pew", true)
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

    if(value.includes("piano")){
      playSound("piano", true)
    }
    if(value.includes("tiktok")){
      playSound("tiktok", true)
    }
    if(value.includes("song")){
      playSound("violin", true)
    }
    if(value.includes("Lạ Lùng")){
      playSound("LaLung", true)
    }
    
  };

  const timer = useRef();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;

  const dispatch = useDispatch();
  const conversationList = useSelector(state => state.chat.conversationList)
  const idConversation =  (conversationList?.find(item => item.idUser === userInfo._id))?._id;
  
  useEffect(() => {
    dispatch(getAllConversationList())
}, [])
  return (
    <div>
      <form onSubmit={handleFormSubmit} className="chatuser-typemessage">
      {
              media && media.image ? (
                <>
                <img className="img" src={media?.content} alt={media.name} />
                <CloseOutlined 
                  onClick={() => setMedia(null)}
                className="icon-close" />
                </>
              ) : null
            }
        <input
          placeholder="Type a message"
          type="text"
          value={value }
          onChange={handleValueChange}
          onKeyDown={(e) => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => {
              socket.emit("typing", {
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
    </div>
  );
}

export default TypeMessage;
