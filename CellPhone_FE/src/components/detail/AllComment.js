import React, { useRef, useState } from "react";
import { Col } from "antd";
import { WechatOutlined, PushpinOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  pinCommentProduct,
  repCommentProduct,
} from "../../actions/ProductAction";
import { useParams } from "react-router-dom";
import AllRepComment from "./AllRepComment";
import {  getFirstCharacterUser } from "../../untils";
import {SmileOutlined} from '@ant-design/icons'
import axios from "axios";
import { EMOJI_ICON } from "../../constants";

function AllComment({allComment,props}) {
  const { id } = useParams();
  //const { allComment } = props;
  // console.log(allComment);
  const dispatch = useDispatch();
  const [repCmt, setRepCmt] = useState({ key: "", status: false });
  const { userInfo } = useSelector((state) => state.userSignin);
  const [repValue, setRepValue] = useState("");

  const showRepComment = (id,author) => {
    setRepCmt({ key: id, status: !repCmt.status });
    setRepValue(`@${author}`);
  };
  const handleRepComment = (value) => {
    if (userInfo) {
      const comment = {
        idComment: repCmt.key,
        isAdmin: userInfo.isAdmin,
        content: repValue,
        nameUser: userInfo.name,
      };
      //console.log(comment);
      dispatch(repCommentProduct(id, comment));
      setRepValue("");
      setRepCmt({ key: "", status: false });
    } else alert("Đăng nhập đi bạn ơi 😊");
  };

  const PinComment = (comment) => {
    const UpdateComment = { ...comment, status: "pin" };
    console.log(UpdateComment);

    dispatch(pinCommentProduct(id, UpdateComment));
  };


 //Emoji
 const emojiRef = useRef(null);
const [showEmoji, setShowEmoji] = useState(false);
const showEmojiHandler = () => {
  setShowEmoji(!showEmoji);
};

const addEmojiHanler1 = (icon) => {
  //show emoji in textarea
  const newComment = repValue + icon.props.children;
  setRepValue(newComment);
  setShowEmoji(false);
};

  return (
    <div class="all-comment">
      {allComment.map((comment) => (
        <>
          <Col span={18} style={{ marginTop: "1rem" }} xs={24} sm={24} md={18}>
            <div className="all-comment-info">
              <div style={{ display: "flex" }}>
                {comment?.isAdmin ? (
                  <div className="all-comment-info-name admin">
                    <img src="https://lh3.googleusercontent.com/a-/AOh14GjMbnZGl3x5R7RnziA1GhF0Z8w2izlMnBWrklJb=s96-c"></img>
                  </div>
                ) : (
                  <div className="all-comment-info-name">
                    {getFirstCharacterUser(comment.author)}
                  </div>
                )}
                {comment?.isAdmin ? (
                  <strong>
                    {comment.author} <span>QTV</span>
                  </strong>
                ) : (
                  <strong>{comment.author}</strong>
                )}
              </div>

              {userInfo?.isAdmin ? (
                <div className="comment-status">
                  <div
                    className="comment-status-pin"
                    onClick={() => PinComment(comment)}
                  >
                    {
                      comment.status === 'pin' ? (<LockOutlined></LockOutlined>) : (<PushpinOutlined></PushpinOutlined>) 
                    }
                  </div>
                </div>
              ) : (
                <div className="comment-status">
                  <div
                    className="comment-status-pin"
                  >
                    {
                      comment.status === 'pin' ? (<PushpinOutlined></PushpinOutlined>) : ''
                    }
                  </div>
                </div>
              )}
            </div>
            <div className="all-comment-content">{comment.content}</div>
            {/* React like,thuongtuong,haha,sad */}
            <div className="all-comment-more">
              <a
                className="all-comment-more-chat"
                onClick={() => showRepComment(comment._id,comment.author)}
              >
                <WechatOutlined style={{ color: "#e11b1e" }} /> <p> Trả lời</p>
              </a>
            </div>
            {comment.replies.length > 0 ? (
              <AllRepComment
                allrepcomment={comment.replies}
                showRepComment={showRepComment}
                id={comment._id}
              ></AllRepComment>
            ) : (
              ""
            )}
          </Col>
          {repCmt.status === true && repCmt.key === comment._id ? (
            <Col
              span={18}
              xs={24}
              md={18}
              align="start"
              style={{
                alignItems: "center",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                className="comment-area"
                style={{ display: "flex", alignItems: "center" }}
              >
                <textarea
                  placeholder="Xin mời để lại câu hỏi, CellphoneS sẽ trả lời trong 1h từ 8h - 22h mỗi ngày."
                  rows={10}
                  cols={3}
                  value={repValue}
                  onChange={(e) => setRepValue(e.target.value)}
                ></textarea>
                <div className="commentTopInputAttachItem " onClick={showEmojiHandler}>
                    <SmileOutlined></SmileOutlined>
                    {showEmoji && (
                        <ul className="commentTopInputAttachEmoji" ref={emojiRef}>
                            {EMOJI_ICON.map((icon, index) => (
                                <li key={index} onClick={() => addEmojiHanler1(icon)}>
                                    {icon}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
              </div>

              <div className="comment-send">
                <button onClick={() => handleRepComment()}>Trả lời</button>
              </div>
            </Col>
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
}

export default AllComment;
