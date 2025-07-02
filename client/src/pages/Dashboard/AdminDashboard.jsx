import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { FaUserShield } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import HeaderDashboard from "./HeaderDashboard";
import ModListPanel from "../../components/Dashboard/ModListPanel";
import { useSelector } from "react-redux";
import CreateModForm from "../../components/Dashboard/CreateModFrom";
import TopicPanel from "../../components/Dashboard/TopicPanel";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("registerMod");
    const user = useSelector(state => state.userInfo.user);

    return (
        <div className="container">
            <HeaderDashboard user={user} />
            <div className="d-flex" style={{ height: "100vh" }}>
                {/* Sidebar */}
                <div className="bg-light border-end" style={{ width: "250px" }}>
                    <ListGroup variant="flush">
                        <ListGroup.Item
                            action
                            active={activeTab === "registerMod"}
                            onClick={() => setActiveTab("registerMod")}
                            className="d-flex align-items-center gap-2"
                        >
                            <FaUserShield />
                            Tạo tài khoản Mod
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            active={activeTab === "modList"}
                            onClick={() => setActiveTab("modList")}
                            className="d-flex align-items-center gap-2"
                        >
                            <FaUsersCog />
                            Danh sách Mod
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            active={activeTab === "topics"}
                            onClick={() => setActiveTab("topics")}
                            className="d-flex align-items-center gap-2"
                        >
                            📋 Topics
                        </ListGroup.Item>

                    </ListGroup>
                </div>

                {/* Main content */}
                <div className="flex-grow-1 bg-white p-4">
                    <h4 className="mb-4">Admin Dashboard</h4>

                    {activeTab === "registerMod" && (
                        <div>
                            <CreateModForm />
                        </div>
                    )}

                    {activeTab === "modList" && (
                        <div>
                            <ModListPanel />
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

export default AdminDashboard;
