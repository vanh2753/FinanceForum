import { useState, useEffect, use } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaUserEdit, FaPenFancy, FaCartArrowDown } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getMyPosts, getMyOrder } from "../../api/user-api"
import UpdateAccountForm from "../../components/Dashboard/UpdateAccountForm";

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState("update");
    const [posts, setPosts] = useState([])
    const [orders, setOrders] = useState([])
    const user = useSelector((state) => state.userInfo.user);

    const fetchPostData = async () => {
        const res = await getMyPosts()
        if (res.EC === 0) {
            setPosts(res.DT)
            //console.log(res.DT)
        }
    }

    const fetchOrderData = async () => {
        const res = await getMyOrder()
        if (res.EC === 0) {
            setOrders(res.DT)
            //console.log(res.DT)
        }
    }

    useEffect(() => {
        fetchPostData()
        fetchOrderData()
    }, [])
    return (
        <div
            className="container-fluid p-0"
            style={{ backgroundColor: "#0F172A", minHeight: "100vh", color: "white" }}
        >
            <div className="d-flex" style={{ minHeight: "100vh" }}>
                {/* Sidebar */}
                <div
                    className="p-3 flex-shrink-0 bg-transparent"
                    style={{ width: "250px", }}
                >
                    <div className="d-flex flex-column gap-2">
                        <button
                            className={`btn w-100 text-start d-flex align-items-center gap-2 ${activeTab === "update"
                                ? "btn-primary"
                                : "btn-outline-light"
                                }`}
                            onClick={() => setActiveTab("update")}
                        >
                            <FaUserEdit />
                            Cập nhật hồ sơ
                        </button>

                        <button
                            className={`btn w-100 text-start d-flex align-items-center gap-2 ${activeTab === "myposts"
                                ? "btn-primary"
                                : "btn-outline-light"
                                }`}
                            onClick={() => setActiveTab("myposts")}
                        >
                            <FaPenFancy />
                            Bài viết của tôi
                        </button>

                        <button
                            className={`btn w-100 text-start d-flex align-items-center gap-2 ${activeTab === "myorders"
                                ? "btn-primary"
                                : "btn-outline-light"
                                }`}
                            onClick={() => setActiveTab("myorders")}
                        >
                            <FaCartArrowDown />
                            Đơn hàng của tôi
                        </button>
                    </div>
                </div>

                {/* Main content */}
                <div className=" flex-grow-1 text-white p-4" style={{ minHeight: "100vh" }}>
                    {activeTab === "update" && <UpdateAccountForm />}

                    {activeTab === "myposts" && (
                        <div>
                            <h5 className="mb-3">Bài viết của bạn</h5>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tiêu đề</th>
                                        <th>Ngày đăng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts?.map((post, index) => (
                                        <tr key={post.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Link to={`/forum/posts/${post.id}`} className="text-decoration-none">
                                                    {post.title}
                                                </Link>
                                            </td>
                                            <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}

                    {activeTab === "myorders" && (
                        <div>
                            <h5 className="mb-3">Sản phẩm đã mua</h5>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Ngày mua</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map((order, index) => (
                                        <tr key={order.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Link to={`/expert/products/${order.product_id}`} className="text-decoration-none">
                                                    {order.Product?.title || "Không rõ"}
                                                </Link>
                                            </td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDashboard