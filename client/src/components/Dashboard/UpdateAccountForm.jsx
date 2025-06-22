import { useState } from "react";
import { useSelector } from "react-redux";
import { updateAvatar, updatePassword, updateUsername } from "../../api/user-api";
import { toast, ToastContainer } from "react-toastify";

const UpdateAccountForm = () => {
    const user = useSelector(state => state.userInfo.user);

    const [avatarFile, setAvatarFile] = useState(null);
    const [username, setUsername] = useState(user.username || "");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [previewAvatar, setPreviewAvatar] = useState(null);

    const handleUpdateAvatar = async () => {
        if (!avatarFile) return;
        const res = await updateAvatar(avatarFile);
    };

    const handleUpdateUsername = async () => {
        if (!username || username === user.username) return;
        const res = await updateUsername(username);
    };

    const handleUpdatePassword = async () => {
        if (!password) return;
        const res = await updatePassword(oldPassword, newPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Bắt đầu cập nhật");

            if (avatarFile) {
                console.log("Đang cập nhật avatar");
                await handleUpdateAvatar();
            }

            if (username && username !== user.username) {
                console.log("Đang cập nhật username");
                await handleUpdateUsername();
            }

            if (oldPassword && newPassword) {
                console.log("Đang cập nhật password");
                await handleUpdatePassword();
            }

            console.log("Thành công toàn bộ");
            toast.success("Cập nhật tài khoản thành công");
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
            toast.error("Cập nhật tài khoản thất bại");
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className="w-75">
                <h5 className="mb-3">Cập nhật tài khoản</h5>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Mật khẩu hiện tại </label>
                    <input
                        type="password"
                        className="form-control"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Mật khẩu mới (tuỳ chọn)</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Avatar</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setAvatarFile(file);

                            // tạo URL tạm thời để hiển thị preview
                            if (file) {
                                const previewUrl = URL.createObjectURL(file);
                                setPreviewAvatar(previewUrl);
                            }
                        }}
                    />

                    {/* Preview hình ảnh */}
                    <div className="mb-3 mt-3 d-flex flex-column align-items-center">
                        <label htmlFor="avatarUpload" style={{ cursor: "pointer" }}>
                            <img
                                src={previewAvatar || user.avatar_url}
                                alt="Avatar preview"
                                className="rounded-circle shadow"
                                style={{
                                    width: "220px",
                                    height: "220px",
                                    objectFit: "cover",
                                    border: "2px solid #ccc",
                                    transition: "0.3s",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.opacity = 0.7)}
                                onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
                            />
                            <div className="text-center" style={{ fontSize: "0.9rem", color: "#ccc", marginTop: "5px" }}>
                                Click để chọn ảnh
                            </div>
                        </label>

                        <input
                            type="file"
                            id="avatarUpload"
                            className="d-none"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setAvatarFile(file);
                                if (file) {
                                    const previewUrl = URL.createObjectURL(file);
                                    setPreviewAvatar(previewUrl);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary px-5">Cập nhật</button>
                </div>
            </form>
            <ToastContainer position="top-center" />
        </div>
    );
};

export default UpdateAccountForm;
