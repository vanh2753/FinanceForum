import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import { getLatestApprovedPosts } from "../../api/forum/post-api"
import { use } from "react"
import "./ForumPage.scss"
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom"
import defaultAvatar from "../../assets/images/default-avatar.png"
import PaginationControls from '../../components/Common/PaginationControls'
import CreatePostForm from "../../components/Forum/Post/CreatePostForm"
import { Button } from "react-bootstrap"
import { GoPlusCircle } from "react-icons/go";
const ForumPage = () => {
    const [postsList, setPostsList] = useState({ posts: [] }); //phải khởi tạo đúng kiểu data tránh lỗi
    const [pageInfo, setPageInfo] = useState({ page: 1, totalPages: 10 });
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const limit = 6

    const fetchData = async (page) => {
        const res = await getLatestApprovedPosts(page, limit)
        if (res.EC === 0) {
            setPostsList(res.DT)
            setPageInfo({ page: res.DT.currentPage, totalPages: res.DT.totalPages });
            //console.log(res.DT)
        }
    }

    useEffect(() => {
        fetchData(1)
    }, [])
    return (
        <>
            <div className='container'>
                <div className="create-post">
                    <Button className="px-3 py-2 mb-3 " onClick={() => setShowCreatePostForm(!showCreatePostForm)} >
                        <GoPlusCircle />Tạo bài viết
                    </Button>
                    {showCreatePostForm && <CreatePostForm />}
                </div>
                <div className='list-post'>
                    <h2 className="fw-bold text-light mb-4">Bài viết mới nhất</h2>
                    <div className='list-post'>
                        {
                            postsList.posts.map((post) => (
                                <Link className="post-link text-decoration-none text-dark" to={`/forum/posts/${post.id}`} key={post.id}>
                                    <div className="post-item d-flex align-items-center p-3 mb-3 rounded">
                                        {/* Phần tiêu đề và ngày tạo */}
                                        <div>
                                            <h5 className="mb-1 fw-semibold text-dark">{post.title}</h5>
                                            <small className="text-muted">{post.createdAt}</small>
                                        </div>

                                        {/* reactions icon */}
                                        <div className="d-flex align-items-center ms-auto gap-4">
                                            {/* Nhóm react: like + comment */}
                                            <div className="react-group d-flex align-items-center gap-2">
                                                <div>{post.likeCount}</div>
                                                <AiOutlineLike size={20} />
                                                <div>{post.commentCount}</div>
                                                <GoComment size={20} />
                                            </div>

                                            {/* author */}
                                            <div className="author-group d-flex align-items-center gap-2">
                                                <div className="author-name h5 mb-0 text-truncate">{post.Account.username}</div>
                                                <img
                                                    src={post.Account.avatar_url || defaultAvatar}
                                                    className="author-avatar mb-1 img-fluid rounded-circle"
                                                    style={{ width: '36px', height: '36px', objectFit: 'cover' }}
                                                    alt="avatar"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <PaginationControls page={postsList.currentPage} totalPages={postsList.totalPages} onPageChange={fetchData} />
                </div>
            </div >
        </>
    )

}

export default ForumPage