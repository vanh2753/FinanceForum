import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import { getLatestApprovedPosts } from "../../api/forum/post-api"
import { use } from "react"
import "./ForumPage.scss"
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom"
import defaultAvatar from "../../assets/images/default-avatar.png"
import CreatePostForm from "../../components/Forum/Post/CreatePostForm"
const ForumPage = () => {
    const [postsList, setPostsList] = useState({ posts: [] }); //phải khởi tạo đúng kiểu data tránh lỗi


    const fetchData = async () => {
        const res = await getLatestApprovedPosts()
        if (res.EC === 0) {
            setPostsList(res.DT)
            //console.log(res.DT)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <div className='container'>
                <div className="create-post">
                    <CreatePostForm />
                </div>
                <div className='list-post'>
                    <h2 className="fw-bold text-light mb-4">Bài viết mới nhất</h2>
                    <div className='list-post'>
                        {
                            postsList.posts.map((post) => (
                                <Link className="post-link text-decoration-none text-dark" to={`/forum/posts/${post.id}`} key={post.id}>
                                    <div className='post-item d-flex  align-items-center p-3 mb-3  rounded ' >
                                        <div className=''>
                                            <h5 className="mb-1 fw-semibold text-dark">{post.title}</h5>
                                            <small className="text-muted">{post.createdAt}</small>
                                        </div>

                                        <div className=" react-group ms-auto d-flex align-items-center">
                                            <div>{post.likeCount} </div>
                                            <AiOutlineLike size={20} />
                                            <div>{post.commentCount}</div>
                                            <GoComment size={20} />
                                        </div>

                                        <div className='author-group d-flex align-items-center ms-auto col-2 justify-content-end'>
                                            <div className='author-name me-4 h4 '>{post.Account.username}</div>
                                            <img src={post.Account.avatar_url || defaultAvatar} className='author-avatar mb-1 img-fluid rounded-circle' alt="avatar" />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div >
        </>
    )

}

export default ForumPage