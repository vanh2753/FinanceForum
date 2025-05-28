import { useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { createArticle, uploadArticleImage } from "../../api/news/article-api"

const CreateArticleForm = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Gửi API tại đây
        const res = await createArticle(title, content)
        if (res.EC === 0) {
            alert(res.EM)
        }

    }

    return (
        <div className="container bg-white p-4 rounded">
            <h2 className=" mb-3 d-flex justify-content-center">Tạo tin tức mới</h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Tiêu đề bài viết"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <Editor
                apiKey="8w72k3k7taxmirqre4k68djcs9z0c4z756wdvap25th7mpzk"
                value={content}
                onEditorChange={(newValue) => setContent(newValue)}
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
                    images_file_types: "jpeg,jpg,png,gif,jfif", // Allow .jfif
                    image_advtab: false, // Disable advanced image tab
                    image_dimensions: false, // Disable width/height fields

                    images_upload_handler: (blobInfo, progress) => {
                        return new Promise(async (resolve, reject) => {
                            try {
                                const file = blobInfo.blob();
                                const url = await uploadArticleImage(file);
                                if (!url) return reject("No URL returned");
                                resolve(url); // TinyMCE expects a direct image URL here
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

        </div>
    )
}

export default CreateArticleForm
