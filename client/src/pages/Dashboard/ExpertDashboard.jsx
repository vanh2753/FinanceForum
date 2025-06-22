import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { FaPlusCircle, FaListAlt } from "react-icons/fa";
import CreateProductForm from "../../components/ExpertView/CreateProductForm";
import ProductListPanel from "../../components/ExpertView/ProductListPanel";
import { useSelector } from "react-redux";
const ExpertDashboard = () => {
    const [activeTab, setActiveTab] = useState("createProduct");
    const user = useSelector((state) => state.userInfo.user);
    return (
        <div
            className="container-fluid p-0"
            style={{ backgroundColor: "#0F172A", minHeight: "100vh", color: "white" }}
        >

            <div className="d-flex" style={{ minHeight: "100vh" }}>
                {/* Sidebar */}
                <div
                    className="p-3 flex-shrink-0 "
                    style={{ width: "250px" }}
                >
                    <div className="d-flex flex-column gap-2">
                        <button
                            className={`btn w-100 text-start d-flex align-items-center gap-2 ${activeTab === "createProduct"
                                ? "btn-primary"
                                : "btn-outline-light"
                                }`}
                            onClick={() => setActiveTab("createProduct")}
                        >
                            <FaPlusCircle />
                            Tạo sản phẩm
                        </button>

                        <button
                            className={`btn w-100 text-start d-flex align-items-center gap-2 ${activeTab === "productList"
                                ? "btn-primary"
                                : "btn-outline-light"
                                }`}
                            onClick={() => setActiveTab("productList")}
                        >
                            <FaListAlt />
                            Danh sách sản phẩm
                        </button>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-grow-1 p-4">
                    {activeTab === "createProduct" && <CreateProductForm />}
                    {activeTab === "productList" && <ProductListPanel />}
                </div>
            </div>
        </div>
    );
}

export default ExpertDashboard