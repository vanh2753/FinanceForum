import { useEffect, useState } from "react";
import { ListGroup, Modal, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { approvePostForMod, getAllPosts } from "../../api/forum/post-api";
import PaginationControls from "../Common/PaginationControls";

const PostApprovalPanel = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

        const fetchPosts = async (page = 1) => {
            try {
                const res = await getAllPosts(page); // chỉnh lại URL nếu cần

                if (res.EC === 0) {
                    setPosts(res.DT.posts);
                    setPage(res.DT.currentPage);
                    setTotalPages(res.DT.totalPages);
                }
            } catch (err) {
                console.error("Failed to fetch posts", err);
            }
        };

        fetchPosts(page);
    }, [page]);

    const handleApprove = async (postId) => {
        try {
            await approvePostForMod(postId);
            setPosts((prev) =>
                prev.map((post) =>
                    post.id === postId ? { ...post, is_approved: true } : post
                )
            );
        } catch (err) {
            console.error("Failed to approve post", err);
        }
    };

    const handleViewContent = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };

    return (
        <>
            <ListGroup>
                {posts.map((post) => (
                    <ListGroup.Item
                        key={post.id}
                        className={`d-flex justify-content-between align-items-center ${post.isApproved ? "text-muted bg-light" : "bg-white"
                            }`}
                        onClick={() => handleViewContent(post)}
                        style={{ cursor: "pointer" }}
                    >
                        <div>
                            <div className="fw-bold">{post.title}</div>
                            <div className="small">
                                {post.Accout?.username} - {post.Topic?.title} -{" "}
                                {new Date(post.createdAt).toLocaleString()}
                            </div>
                        </div>

                        <div>
                            {post.is_approved ? (
                                <span className="badge bg-secondary">Đã duyệt</span>
                            ) : (
                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Không mở modal
                                        handleApprove(post.id);
                                    }}
                                >
                                    Duyệt
                                </Button>
                            )}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <PaginationControls
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            {/* Modal hiển thị nội dung bài viết */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title >Nội dung bài viết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex">
                        {/* Cột trái: Thông tin tác giả */}
                        <div className="col-md-3 border-end">
                            <div className="text-center mb-3">
                                <img
                                    src={selectedPost?.Account?.avatar_url || "/default-avatar.png"}
                                    alt="Avatar"
                                    className="img-fluid rounded-circle mb-2"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                />
                                <h6>{selectedPost?.Account?.username || "Ẩn danh"}</h6>
                            </div>
                        </div>

                        {/* Cột phải: Nội dung + ảnh */}
                        <div className="col-md-9 px-3 pt-2">
                            <div className="mb-4">{selectedPost?.content}</div>

                            {/* Danh sách ảnh nếu có */}
                            {selectedPost?.image_urls?.length > 0 && (
                                <div className="d-flex flex-column gap-3">
                                    {selectedPost.image_urls.map((url, idx) => (
                                        <img
                                            key={idx}
                                            src={url}
                                            className="img-fluid  "
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
};

export default PostApprovalPanel;
