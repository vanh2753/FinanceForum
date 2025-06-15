import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireRole = ({ roles }) => {
    const user = useSelector((state) => state.userInfo.user);

    if (!user) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
                <h1 className=" text-danger">Quay về trang chủ và đăng nhập!</h1>
            </div>
        );
    }

    if (!roles.includes(user.role)) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
                <h1 className="text-danger">403</h1>
                <p className="lead">Không có quyền truy cập trang này.</p>
            </div>
        );
    }

    return <Outlet />;
};

export default RequireRole;
