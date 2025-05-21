import LikeButton from "../ActionButton/LikeButton"
import defaultAvatar from '../../../assets/images/default-avatar.png'
import { unlikeForComment, createLikeForComment } from "../../../api/forum/comment-api"
import { useState } from "react"
const CommentItem = ({ comment }) => {

    const [liked, setLiked] = useState(comment.isLiked)
    const [likesCount, setLikesCount] = useState(comment.likeCount)
    const handleLike = async (id) => {
        const previousLike = liked
        const previousCount = likesCount

        // update UI trước khi gọi api
        setLiked(!liked);
        setLikesCount(liked ? likesCount - 1 : likesCount + 1)

        try {
            if (liked) {
                // đã like thì click sẽ là unlike
                await unlikeForComment(id)
            }
            else {
                // chua like thì click sẽ là like
                await createLikeForComment(id)
            }
        } catch (error) {
            // API lỗi không gọi được thì rollback
            console.log("Error: ", error)
            setLiked(previousLike)
            setLikesCount(previousCount)
        }
    }
    return (
        <div
            className="d-flex border-bottom py-2 px-2 align-items-start bg-white"
        >
            <img
                src={comment.Account.avatar_url || defaultAvatar}
                alt="avatar"
                className="rounded-circle me-2"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <div className="flex-grow-1">
                <div className="fw-semibold">{comment.Account.username}</div>
                <div style={{ fontSize: "0.9rem" }}>
                    {comment.content}
                </div>
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                    {new Date(comment.createdAt).toLocaleString()}
                </div>
            </div>
            <div className="action-buttons mx-3">
                <div><LikeButton liked={liked} likesCount={likesCount} handleLike={() => handleLike(comment.id)} /></div>
            </div>
        </div>
    )
}
export default CommentItem