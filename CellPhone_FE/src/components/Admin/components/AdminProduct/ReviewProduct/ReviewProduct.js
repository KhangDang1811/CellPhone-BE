import React, { useEffect, useRef } from "react";
import "./ReviewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import {
  BlogProduct,
  getproductById,
} from "../../../../../actions/ProductAction";
import { useParams,useHistory } from "react-router-dom";
import { message} from 'antd';

export default function ReviewProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const history = useHistory();
  const detailProduct = useSelector((state) => state.getProductById.product);

  const success = () => {
    message.success({
        content: `Thêm review thành công`,
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
  const log = () => {
    if (editorRef.current) {
      const blogContent = String(editorRef.current.getContent());

      dispatch(BlogProduct(id, { blogContent }));
      success();
    }
  };

  useEffect(() => {
    dispatch(getproductById(id));
  }, [dispatch, id]);

  return (
    <section id="review">
      <div className="review">
        <span className="review-title">Review </span>

        <div className="review-content">
          {detailProduct ? (
            <Editor
              apiKey="cmlltcvw2ydrtenwdgwdwqqrvsje6foe8t5xtyaq6lo2ufki"
              language='vi'
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={detailProduct.blog}
              init={{
                height: 500,
                menubar: "file edit view insert format tools table tc help",
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          ) : (
            ""
          )}
          <button onClick={log}>Add Review Product</button>
        </div>
      </div>
    </section>
  );
}
