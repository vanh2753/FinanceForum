import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import NewsItem from "../../components/News/NewsItem"
import PaginationControls from "../../components/Common/PaginationControls"
import { getAllNews } from "../../api/news/article-api"
import { useSelector } from 'react-redux'

const NewsPage = () => {
    const [newsList, setNewsList] = useState({ items: [], total: 0, page: 1 });
    const [limit] = useState(5); // số bài trên mỗi trang
    const user = useSelector(state => state.userInfo?.user);

    const fetchNewsList = async (page = 1) => {
        const res = await getAllNews(page, limit); // Gọi API với page + limit
        if (res.EC === 0) {
            setNewsList({ ...res.DT, page }); // { items, total }
        }
    };

    useEffect(() => {
        fetchNewsList();
    }, []);

    return (
        <div className="container">
            {user?.role === 'mod' && (
                <Link to="/news/create-article" className="d-flex justify-content-center mb-3">
                    <Button className="px-5 py-3">Đăng tin tức mới</Button>
                </Link>
            )}

            <div className="news-list">
                {newsList.items.map((item, index) => (
                    <NewsItem key={index} data={item} />
                ))}
            </div>
            <PaginationControls
                page={newsList.page}
                totalPages={newsList.totalPages}
                onPageChange={(newPage) => fetchNewsList(newPage)}
            />
        </div>
    );
};

export default NewsPage;
