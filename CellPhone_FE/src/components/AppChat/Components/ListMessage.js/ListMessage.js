import React, { useState } from 'react';
import { timeSince } from '../../../../untils';

function ListMessage(props) {
    const {messages, user} = props
   
    const [openTimeSince, setOpenTimeSince] = useState({ key: "", status: false });
    const handleMouseEnter = (id) => {
        setOpenTimeSince({ key: id, status: !openTimeSince.status });
    };
  
    const handleMouseLeave = (id) => {
        setOpenTimeSince({ key: id, status: !openTimeSince.status });
    };
    return (
        <div className="chatuser-listmessage">
            { 
                messages.map((message,id) => (
                    <>
                <div className={user.name === message.sender ? 'chatuser-listmessage-message me' : 'chatuser-listmessage-message'}>
                {
                     user.name === message.sender && openTimeSince.status === true && openTimeSince.key === message._id  ? (
                        <div key={id} className="time">
                        <span className="time-since">{timeSince(new Date(message.createdAt).getTime()/1000)} trước</span>
                       </div>
                       ) : ("")
                   }
                   {
                       message.message.length > 500 ? (
                        <img 
                        onMouseEnter={() => handleMouseEnter(message._id)}
                        onMouseLeave={() => handleMouseLeave(message._id)}
                        className="img-mes" src={message.message}></img>
                          ) : (
                            <p 
                             onMouseEnter={() => handleMouseEnter(message._id)}
                            onMouseLeave={() => handleMouseLeave(message._id)}
                            >{message.message}</p>
                            )
                   }
                    {/* <p  onMouseEnter={() => handleMouseEnter(message._id)}
                     onMouseLeave={() => handleMouseLeave(message._id)}
                     >{message.message}</p> */}
                      {/* <img className="img-mes" src={message.message} className="time-since"></img> */}
                     {
                        user.name !== message.sender && openTimeSince.status === true && openTimeSince.key === message._id  ? (
                            <div key={id} className="time">
                            <span className="time-since1">{timeSince(new Date(message.createdAt).getTime()/1000)} trước</span>
                        </div>
                        ) : ("")
                     }
                </div>
                </>
                ))
            }
          
        </div>
    );
}

export default ListMessage;