import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { createArticle, uploadArticleImage } from "../../api/news/article-api";
import { toast, ToastContainer } from "react-toastify";

const CreateArticleForm = () => {
    const [title, setTitle] = useState("");
    const editorRef = useRef(null); // dùng để truy cập TinyMCE instance

    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = editorRef.current.getContent();

        const res = await createArticle(title, content);
        if (res.EC === 0) {
            toast.success("Đã đăng tải tin tức mới!");
            setTitle("");
            editorRef.current.setContent(""); // RESET TinyMCE về rỗng
        } else {
            toast.error(res.EM || "Đăng bài viết thất bại.");
        }
    };

    return (
        <div className="container bg-white p-4 rounded">
            <h2 className="mb-3 d-flex justify-content-center">Tạo tin tức mới</h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Tiêu đề bài viết"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <Editor
                apiKey="8w72k3k7taxmirqre4k68djcs9z0c4z756wdvap25th7mpzk"
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                    height: "60vh",
                    menubar: false,
                    plugins: [
                        "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
                        "searchreplace", "visualblocks", "code", "fullscreen",
                        "insertdatetime", "media", "table", "help", "wordcount"
                    ],
                    toolbar:
                        "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | removeformat | help",
                    automatic_uploads: true,
                    images_file_types: "jpeg,jpg,png,gif,jfif",
                    image_advtab: false,
                    image_dimensions: false,
                    images_upload_handler: (blobInfo, progress) => {
                        return new Promise(async (resolve, reject) => {
                            try {
                                const file = blobInfo.blob();
                                const url = await uploadArticleImage(file);
                                if (!url) return reject("No URL returned");
                                resolve(url);
                            } catch (err) {
                                console.error("Image upload failed:", err);
                                reject("Image upload failed");
                            }
                        });
                    }
                }}
            />

            <div className="d-flex justify-content-center">
                <button className="btn btn-primary px-5 mt-2" onClick={handleSubmit}>
                    Tạo bài viết
                </button>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default CreateArticleForm;
