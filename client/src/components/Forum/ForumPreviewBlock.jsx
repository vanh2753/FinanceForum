import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './forumPreview.scss';

const ForumPreviewBlock = ({ topicsData }) => {
    return (
        <div className="forum-preview-block py-5">
            <div className="d-flex align-items-center mb-4">
                <h3 className="text-light mb-0 me-3">Diễn đàn</h3>
                <Link to="/forum" className="btn btn-sm btn-outline-custom">
                    Xem thêm
                </Link>
            </div>

            <div className="row">
                {topicsData.map((topic) => (
                    <div key={topic.id} className="col-12 col-md-6 col-lg-3 mb-4">
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title className="mb-3">{topic.title}</Card.Title>
                                {topic.Posts.slice(0, 5).map((post) => (
                                    <Card.Text key={post.id} className="mb-2">
                                        <Link
                                            to={`/forum/posts/${post.id}`}
                                            className="post-link text-decoration-none text-dark d-block border-bottom "
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
