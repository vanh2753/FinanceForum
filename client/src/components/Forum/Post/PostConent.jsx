import React, { useEffect } from "react";
import "./PostContent.scss"; // nếu muốn tách CSS riêng
import defaultAvatar from "../../../assets/images/default-avatar.png";
import LikeButton from "../ActionButton/LikeButton";
import { useState } from "react";
import { createLikeForPost, unlikeForPost } from "../../../api/forum/post-api";
import { FaEllipsisH } from "react-icons/fa";
import EditDelButton from "../ActionButton/EditDelButton";
import { useSelector } from "react-redux";
import AuthModal from "../../Auth/AuthModal";
import { GoComment } from "react-icons/go";
const PostContent = ({ postData }) => {
  const {
    author_id,
    title,
    content,
    image_urls,
    createdAt,
    Account = {},
    isLiked,
    likeCount,
    commentCount
  } = postData;

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showToolTips, setShowToolTips] = useState(false);
  const [show, setShow] = useState(false)

  const userId = useSelector((state) => state.userInfo.user?.id);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    setLiked(isLiked);
    setLikesCount(likeCount);
  }, [isLiked]);

  const handleLike = async () => {
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
          await unlikeForPost(postData.id);
        } else {
          // chua like thì click sẽ là like
          await createLikeForPost(postData.id);
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
    <div className="container  ">
      {show && <AuthModal show={show} setShow={setShow} />}
      <div className=" content-container  row text-light rounded shadow-sm p-3">
        {/* người đăng */}
        <div className="col-md-2 text-center border-end pe-3">
          <img
            src={Account.avatar_url || defaultAvatar}
            alt="avatar"
            className="img-fluid rounded-circle mb-2"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
          <div className="fw-bold" style={{ fontSize: "1.2rem" }}>
            {Account.username}
          </div>
          <div className="" style={{ fontSize: "0.8rem" }}>
            {Account.email}
          </div>
        </div>

        {/* Post content  */}
        <div className="col-md-10 ps-4">
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="fw-bold">{title}</h4>
              <div className=" mb-2" style={{ fontSize: "0.8rem" }}>
                {new Date(createdAt).toLocaleString()}
              </div>
            </div>

            {/* tool tip */}
            {userId === author_id && (
              <div
                className="position-relative d-flex align-items-center mx-3"
                style={{ fontSize: "1.2rem" }}
              >
                <FaEllipsisH onClick={() => setShowToolTips(!showToolTips)} />

                {showToolTips && (
                  <div className="position-absolute end-100 p-2 rounded shadow mx-2" style={{ backgroundColor: '#343a40' }}>
                    <EditDelButton data={postData} type="post" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border p-3 rounded">
            {content}
            {image_urls && image_urls.length > 0 && (
              <div className="mt-3">
                {image_urls.map((imgUrl, index) => (
                  <div key={index} className="mb-2">
                    <img
                      src={imgUrl}
                      alt={`post-img-${index}`}
                      className="img-fluid rounded"
                      style={{
                        maxHeight: "300px",
                        maxWidth: "100%",
                        width: "auto",
                        objectFit: "cover",
                        border: "1px solid #dee2e6",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="btn-gr d-flex">
            <div className="like-button me-3">
              <div className="d-flex">
                <LikeButton
                  liked={liked}
                  likesCount={likesCount}
                  handleLike={handleLike}
                />
              </div>
            </div>
            <div className="comment-icon start d-flex align-items-end pb-1">
              <GoComment className=" text-light" style={{ fontSize: "1.5rem" }} />
              <div className=" text-light" style={{ marginLeft: "0.3rem" }}>
                {commentCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
