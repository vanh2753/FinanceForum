import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import NewsItem from "../../components/News/NewsItem"
import PaginationControls from "../../components/Common/PaginationControls"
import SearchBar from "../../components/Common/SearchBar"
import { getAllNews } from "../../api/news/article-api"
import { getSearchArticlesResult } from "../../api/news/article-api"
import { useSelector } from 'react-redux'

const NewsPage = () => {
    const [newsList, setNewsList] = useState({ items: [], total: 0, page: 1 });
    const [limit] = useState(5);
    const [searchParams] = useSearchParams();
    const user = useSelector(state => state.userInfo?.user);

    const searchInput = searchParams.get("searchInput");

    const fetchNewsList = async (page = 1) => {
        let res;
        if (searchInput) {
            res = await getSearchArticlesResult(searchInput, page, limit);
            console.log(res);
        } else {
            res = await getAllNews(page, limit);
        }

        if (res.EC === 0) {
            setNewsList({ ...res.DT, page });
        }
    };

    useEffect(() => {
        fetchNewsList();
    }, [searchInput]);

    return (
        <div className="container">
            {user?.role === 'mod' && (
                <Link to="/news/create-article" className="d-flex justify-content-center mb-3">
                    <Button className="px-5 py-3">Đăng tin tức mới</Button>
                </Link>
            )}

            <SearchBar placeholder="Bạn muốn đọc gì ?" searchPath="/news" />

            <div className="news-list">
                {newsList.items.length > 0 ? (
                    newsList.items.map((item, index) => (
                        <NewsItem key={index} data={item} />
                    ))
                ) : (
                    <p className="text-center text-muted">Không tìm thấy bài viết nào.</p>
                )}
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
