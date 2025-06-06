import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './forumPreview.scss';

const ForumPreviewBlock = ({ topicsData }) => {
    return (
        <div className="forum-preview-block py-5">
            <div className="d-flex justify-content-center align-items-center mb-4">
                <h3 className=" text-light mb-0 me-3">Bài viết thảo luận</h3>
            </div>

            <div className="row">
                {topicsData.map((topic) => (
                    <div key={topic.id} className="col-12 col-md-6 col-lg-3 mb-4">
                        <Card className="topic-card h-100">
                            <Card.Body>
                                <Card.Title className="mb-3 text-center">{topic.title}</Card.Title>
                                {topic.Posts.slice(0, 5).map((post) => (
                                    <Card.Text key={post.id} className="mb-2">
                                        <Link
                                            to={`/forum/posts/${post.id}`}
                                            className="post-link text-decoration-none text-white d-block p-2"
                                        >
                                            {post.title.length > 50 ? post.title.slice(0, 50) + '…' : post.title}
                                        </Link>
                                    </Card.Text>
                                ))}
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForumPreviewBlock;
