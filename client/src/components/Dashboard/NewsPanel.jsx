import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllArticlesForMod, deleteArticle } from "../../api/news/article-api";

const NewsPanel = () => {
    const [newsList, setNewsList] = useState([]);
    const navigate = useNavigate();

    const fetchNews = async () => {
        try {
            const res = await getAllArticlesForMod();
            setNewsList(res.DT);

        } catch (error) {
            console.error("Failed to fetch news", error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
            try {
                const res = await deleteArticle(id);
                if (res.EC === 0) {
                    fetchNews();
                }
            } catch (error) {
                console.error("Failed to delete news", error);
            }
        }
    };

    return (
        <div>
            <h5 className="mb-3 text-white">Danh sách bài viết News</h5>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th className="text-center">Bài báo</th>
                        <th>Người đăng</th>
                    </tr>
                </thead>
                <tbody>
                    {newsList.map((news, index) => (
                        <tr key={news.id}>
                            <td>{index + 1}</td>
                            <td>
                                <a
                                    href={`/news/article/${news.id}`}
                                    target="_blank"
                                    className="text-decoration-none text-dark"
                                >
                                    {news.title}
                                </a>
                            </td>
                            <td>{news.Account?.username}</td>
                            <td className="text-center">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(news.id)}
                                >
                                    Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default NewsPanel;
