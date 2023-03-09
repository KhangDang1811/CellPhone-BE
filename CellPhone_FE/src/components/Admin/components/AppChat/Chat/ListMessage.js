import React, { useState } from 'react';
import { timeSince } from '../../../../../untils';

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
        <div className="ad-chatuser-listmessage">
            { 
                messages.length > 0 ? messages.map(message => (
                <div key={message._id} className={user.name === message.sender ? 'ad-chatuser-listmessage-message me' : 'ad-chatuser-listmessage-message'}>
                    {
                        user.name === message.sender && openTimeSince.status === true && openTimeSince.key === message._id  ? (
                        <div className="time">
                            <span className={user.name === message.sender ?"time-since1" :"time-since1"}>{timeSince(new Date(message.createdAt).getTime()/1000)} trước</span>
                        </div>):("")
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
                    {
                        user.name != message.sender && openTimeSince.status === true && openTimeSince.key === message._id  ? (
                        <div className="time">
                            <span className={user.name === message.sender ?"time-since1" :"time-since1"}>{timeSince(new Date(message.createdAt).getTime()/1000)} trước</span>
                        </div>):("")
                    }
                </div>)) : ''
            }
            
        </div>
    );
}

export default ListMessage;