import LikeButton from "../ActionButton/LikeButton";
import defaultAvatar from "../../../assets/images/default-avatar.png";
import {
  unlikeForComment,
  createLikeForComment,
} from "../../../api/forum/comment-api";
import { useState } from "react";
import AuthModal from "../../Auth/AuthModal";
import { useSelector } from "react-redux";
import EditDelButton from "../ActionButton/EditDelButton";
const CommentItem = ({ comment }) => {
  const [liked, setLiked] = useState(comment.isLiked);
  const [likesCount, setLikesCount] = useState(comment.likeCount);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [show, setShow] = useState(false)

  const user = useSelector((state) => state.userInfo.user);
  const handleLike = async (id) => {
    if (!isLoggedIn) {
      setShow(true);
      return;
    }
    else {
      const previousLike = liked;
      const previousCount = likesCount;

      // update UI trước khi gọi api
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);

      try {
        if (liked) {
          // đã like thì click sẽ là unlike
          await unlikeForComment(id);
        } else {
          // chua like thì click sẽ là like
          await createLikeForComment(id);
        }
      } catch (error) {
        // API lỗi không gọi được thì rollback
        console.log("Error: ", error);
        setLiked(previousLike);
        setLikesCount(previousCount);
      }
    }

  };
  return (
    <div
      className="d-flex py-2 px-2 align-items-startm mb-2 px-3"
      style={{ backgroundColor: "#1c2e4a", borderLeft: '1px solid white' }}
    >
      {show && <AuthModal show={show} setShow={setShow} />}
      <img
        src={comment.Account.avatar_url || defaultAvatar}
        alt="avatar"
        className="rounded-circle me-2"
        style={{ width: "40px", height: "40px", objectFit: "cover" }}
      />
      <div className="flex-grow-1 text-light">
        <div className="fw-bold ">{comment.Account.username}</div>
        <div style={{ fontSize: "0.9rem" }}>{comment.content}</div>
        <div className="" style={{ fontSize: "0.75rem" }}>
          {new Date(comment.createdAt).toLocaleString()}
        </div>
        {user?.id === comment.Account?.id && (
          <div className="text-white">
            <EditDelButton data={comment} type="comment" />
          </div>
        )}
      </div>


      <div className="action-buttons mx-3">
        <div>
          <LikeButton
            liked={liked}
            likesCount={likesCount}
            handleLike={() => handleLike(comment.id)}
          />
        </div>
      </div>
    </div>
  );
};
export default CommentItem;
