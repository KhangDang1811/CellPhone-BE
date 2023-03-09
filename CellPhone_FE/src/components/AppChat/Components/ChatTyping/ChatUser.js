import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllConversationList } from "../../../../actions/ChatAction";
import '../../../../untils/ChatUserAction.css';
import typings from '../../../../untils/typing.mp3';

const playSound = (type, sound) => {
    const list = {
      typing: typings,
    };
    const audio = new Audio(list[type]);
    if (sound) {
        audio.play();
    }
    return audio;
  };

function ChatUser ( props ) {
   const {socket} = props;
  const [userAction, setUserAction] = useState({ isTyping: false});
  // console.log("client",userAction);
  const timer = useRef();
 
 
  useEffect(() => {
    socket?.on("participant-action", (data) => {
      playSound("typing", true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setUserAction(data);
        setTimeout(() => {
          setUserAction((u) => ({ ...u, isTyping: false }));
        }, 3000);
      }, 100);
    });

  });

  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;
  const conversationList = useSelector(state => state.chat.conversationList)
  const NameUserTyping =  (conversationList?.find(item => item.idUser === userInfo._id))?.nameConversation;

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllConversationList())
}, [])

  return (
    <div>
        {userAction.isTyping && userInfo.name != userAction.sender ? (
                <div className="otherEnd-actions">
                    <div>
                        <span>{userAction.sender}</span>
                        <span class="dot dot-1">.</span>
                        <span class="dot dot-2">.</span>
                        <span class="dot dot-3">.</span>   
                        
                    </div>
                </div>
            ):("")
        }
    </div>
  );
};

export default ChatUser;
