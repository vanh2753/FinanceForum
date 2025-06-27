import { useState, useEffect } from "react"
import { getTrendingPosts } from "../../api/forum/post-api"
import { Link } from "react-router-dom"
import { AiOutlineLike } from "react-icons/ai"

const TrendingPostBox = () => {

    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const res = await getTrendingPosts()
        if (res.EC === 0) {
            setPosts(res.DT)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])
    return (
        <div className="bg-light p-3 rounded">
            <h5 className="fw-bold mb-3 text-dark">🔥 Bài viết nổi bật</h5>
            {posts.length === 0 ? (
                <p className="text-muted">Chưa có dữ liệu</p>
            ) : (
                posts.map(post => (
                    <Link
                        key={post.id}
                        to={`/forum/posts/${post.id}`}
                        className="d-block text-decoration-none mb-3"
                    >
                        <div className="p-2 border rounded bg-white">
                            <h6 className="fw-semibold text-dark mb-1" style={{ wordBreak: "break-word" }}>
                                {post.title}
                            </h6>
                            <div className="d-flex justify-content-between align-items-center text-muted small">
                                <span>Người đăng: {post.Account?.username}</span>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="d-flex align-items-center mt-1 ">
                                <AiOutlineLike className="me-1" />
                                <span>{post.likeCount}</span>
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    )
}

export default TrendingPostBox