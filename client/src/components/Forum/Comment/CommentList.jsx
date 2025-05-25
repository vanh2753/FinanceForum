import { useState, useEffect } from "react"
import { createLikeForComment, getCommentData, unlikeForComment } from '../../../api/forum/comment-api'
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import CommentItem from "./CommentItem";
const CommentList = (props) => {
    const user = useSelector((state) => state.userInfo.user);
    const { refreshCommentList } = props

    const { postId } = useParams();

    const [commentData, setCommentData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true); // kiểm soát nút tải thêm
    const limit = 5;

    const fetchCommentData = async (isLoadMore = false) => {
        const res = await getCommentData(postId, limit, offset);
        //console.log(res)
        if (res.EC === 0) {
            if (res.DT.length < limit) setHasMore(false); // hết comment thì khóa nút tải thêm
            setCommentData(prev =>
                isLoadMore ? [...prev, ...res.DT] : res.DT
            );
        } else {
            console.error("Lỗi fetch comment:", res);
        }
    };

    //  load thêm
    useEffect(() => {
        fetchCommentData(offset > 0); // offset > 0 thì là load thêm
    }, [offset, refreshCommentList, postId]);

    // Lần đầu vào load 5 comment đầu tiên
    useEffect(() => {
        setOffset(0); // reset lại offset nếu vào post khác
        setHasMore(true); // reset lại hasMore nếu vào post khác
    }, [postId]); // mỗi lần thay đổi bài viết và khi comment thành công (state refresh thay đổi)

    const handleLoadMore = () => {
        setOffset(prev => prev + limit);
    };

    return (
        <div className="mt-4">
            {commentData.map((comment) => (
                <div key={comment.id}>
                    <CommentItem comment={comment} />
                </div>

            ))}
            <div className="text-center mt-3">
                <button className="btn btn-outline-primary" onClick={handleLoadMore}>
                    Tải thêm bình luận
                </button>
            </div>
        </div>
    );

}

export default CommentList