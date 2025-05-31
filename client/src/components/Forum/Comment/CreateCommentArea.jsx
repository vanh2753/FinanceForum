import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import defaultAvatar from "../../../assets/images/default-avatar.png";
import { createComment } from "../../../api/forum/comment-api";
import { useParams } from "react-router-dom";
const CreateCommentArea = (props) => {
  const { commentSuccess } = props;
  const user = useSelector((state) => state.userInfo.user);
  const [commentContent, setCommentContent] = useState("");
  const { postId } = useParams();

  const handleSumbit = async (e) => {
    e.preventDefault();
    const res = await createComment(postId, commentContent);
    if (res.EC === 0) {
      commentSuccess();
      setCommentContent("");
    }
    //console.log(res)
  };

  return (
    <div
      className="d-flex mt-3 p-3 rounded border"
      style={{ backgroundColor: "#1c2e4a" }}
    >
      <div className="me-3 text-center" style={{ width: "60px" }}>
        <img
          src={user?.avatar_url || defaultAvatar}
          alt="avatar"
          className="rounded-circle"
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
        />
        <div className="fw-bold text-light mt-1">{user?.username}</div>
      </div>
      <div className="flex-grow-1">
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Viết bình luận ..."
            value={commentContent}
            onChange={(e) => {
              setCommentContent(e.target.value);
            }}
          />
        </Form.Group>
        <div className="d-flex justify-content-start mt-2">
          <Button onClick={handleSumbit}>Bình luận</Button>
        </div>
      </div>
    </div>
  );
};
export default CreateCommentArea;
