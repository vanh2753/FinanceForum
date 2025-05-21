import './forumPreview.scss'
import { Link } from 'react-router-dom';
const ForumPreviewBlock = (props) => {
    const { topicsData } = props
    return (
        <div className='forum-preview-block'>
            <div className='d-flex '>
                <h3 className='text-light my-auto'>Diễn đàn</h3>
                <Link to={`/forum`} className="btn btn-sm btn-outline-custom mx-2 my-auto">
                    Xem thêm
                </Link>
            </div>
            {topicsData.map((topic) => (
                <div
                    key={topic.id}
                    className="forum-preview-item border rounded-3 p-3 mb-4 bg-light shadow-sm"
                >
                    <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                        <h5 className="mb-0">{topic.title}</h5>

                    </div>

                    <ul className="list-unstyled mb-0 ps-2">
                        {topic.Posts.map((post) => (
                            <li key={post.id} className="mb-1">
                                <Link
                                    to={`/forum/posts/${post.id}`}
                                    className="post-link text-decoration-none text-dark d-block p-2 rounded"
                                >
                                    {post.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>


    )
}

export default ForumPreviewBlock