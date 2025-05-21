import React, { useEffect } from "react";
import "./PostContent.scss"; // nếu muốn tách CSS riêng
import defaultAvatar from '../../../assets/images/default-avatar.png';
import LikeButton from "../ActionButton/LikeButton";
import { useState } from "react";
import { createLikeForPost, unlikeForPost } from "../../../api/forum/post-api";
const PostContent = ({ postData }) => {
    const { title, content, createdAt, Account = {}, isLiked, likeCount } = postData;

    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)

    useEffect(() => {
        setLiked(isLiked)
        setLikesCount(likeCount)
    }, [isLiked])

    const handleLike = async () => {
        const previousLike = liked
        const previousCount = likesCount

        // update UI trước khi gọi api
        setLiked(!liked);
        setLikesCount(liked ? likesCount - 1 : likesCount + 1)

        try {
            if (liked) {
                // đã like thì click sẽ là unlike
                await unlikeForPost(postData.id)
            }
            else {
                // chua like thì click sẽ là like
                await createLikeForPost(postData.id)
            }
        } catch (error) {
            // API lỗi không gọi được thì rollback
            console.log("Error: ", error)
            setLiked(previousLike)
            setLikesCount(previousCount)
        }
    };

    return (
        <div className="container ">
            <div className="row bg-white text-dark rounded shadow-sm p-3">
                {/* Author column */}
                <div className="col-md-2 text-center border-end pe-3">
                    <img
                        src={Account.avatar_url || defaultAvatar}
                        alt="avatar"
                        className="img-fluid rounded-circle mb-2"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}

                    />
                    <div className="fw-bold" style={{ fontSize: "1.2rem" }} >{Account.username}</div>
                    <div className="text-muted" style={{ fontSize: "0.8rem" }} >{Account.email}</div>
                </div>

                {/* Post content column */}
                <div className="col-md-10 ps-4">
                    <h5 className="fw-bold">{title}</h5>
                    <div className="text-muted mb-2" style={{ fontSize: "0.8rem" }}>
                        {new Date(createdAt).toLocaleString()}
                    </div>
                    <div
                        className="border p-3 rounded"
                    >
                        {content}
                    </div>

                    <div className="action-buttons">
                        <div><LikeButton liked={liked} likesCount={likesCount} handleLike={handleLike} /></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostContent;
