import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
const LikeButton = (props) => {
  const { liked, likesCount, handleLike } = props;

  return (
    <button
      className="border-0 bg-transparent mt-3"
      onClick={handleLike}
      style={{ fontSize: "1.2rem" }}
    >
      {liked ? (
        <div className="d-flex align-items-center">
          <AiFillLike className=" text-light" style={{ fontSize: "1.5rem" }} />
          <div
            className=" text-light"
            style={{ fontWeight: "bold", marginLeft: "0.3rem" }}
          >
            {likesCount}
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <AiOutlineLike
            className=" text-light"
            style={{ fontSize: "1.5rem" }}
          />
          <div className=" text-light" style={{ marginLeft: "0.3rem" }}>
            {likesCount}
          </div>
        </div>
      )}
    </button>
  );
};

export default LikeButton;
