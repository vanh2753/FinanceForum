import { Outlet } from "react-router-dom";

const ModLayout = () => {
    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            {/* Có thể thêm thanh tiêu đề riêng ở đây nếu muốn */}
            <Outlet />
        </div>
    );
}

export default ModLayout
