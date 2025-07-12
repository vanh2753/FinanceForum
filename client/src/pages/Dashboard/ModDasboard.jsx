import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { FaListCheck } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import PostApprovalPanel from "../../components/Dashboard/PostApprovalPanel";
import AssignExpertPanel from "../../components/Dashboard/AssignExpertPanel";
import { useSelector } from "react-redux";
import HeaderDashboard from "./HeaderDashboard";
import { MdArticle } from "react-icons/md";
import NewsPanel from "../../components/Dashboard/NewsPanel";
import TopicPanel from "../../components/Dashboard/TopicPanel";
import { MdTopic } from "react-icons/md";
const ModDashboard = () => {
    const [activeTab, setActiveTab] = useState("posts"); //quản lý state để viết điều kiện render content
    const user = useSelector(state => state.userInfo.user)


    return (
        <div className="container ">
            <HeaderDashboard user={user} />
            <div className="d-flex" style={{ height: "100vh" }}>
                {/* Sidebar */}
                <div className="bg-light border-end" style={{ width: "250px" }}>
                    <ListGroup variant="flush">
                        <ListGroup.Item
                            action
                            active={activeTab === "posts"}
                            onClick={() => setActiveTab("posts")}
                            className="d-flex align-items-center  gap-2"
                        >
                            <FaListCheck />
                            Duyệt bài viết
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            active={activeTab === "experts"}
                            onClick={() => setActiveTab("experts")}
                            className="d-flex align-items-center  gap-2"
                        >
                            <FaUserCheck />
                            Cấp quyền chuyên gia
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            active={activeTab === "newsPanel"}
                            onClick={() => setActiveTab("newsPanel")}
                            className="d-flex align-items-center gap-2 "
                        >
                            <MdArticle />
                            Quản lý Tin tức
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            active={activeTab === "topics"}
                            onClick={() => setActiveTab("topics")}
                            className="d-flex align-items-center gap-2"
                        >
                            <MdTopic /> Topics
                        </ListGroup.Item>

                    </ListGroup>
                </div>

                {/* Main content */}
                <div className="flex-grow-1 bg-white p-4">
                    <h4 className="mb-4">Moderator Dashboard</h4>

                    {activeTab === "posts" && (
                        <div>
                            <PostApprovalPanel />
                        </div>
                    )}

                    {activeTab === "experts" && (
                        <div>
                            <AssignExpertPanel />
                        </div>
                    )}

                    {activeTab === "newsPanel" && (
                        <div>
                            <NewsPanel />
                        </div>
                    )}
                    {activeTab === "topics" && (
                        <div>
                            <TopicPanel />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModDashboard;
