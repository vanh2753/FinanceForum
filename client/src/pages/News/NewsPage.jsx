import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import NewsItem from "../../components/News/NewsItem"
import { getAllNews } from "../../api/news/article-api"

const NewsPage = () => {
    const [newsList, setNewsList] = useState({ items: [], total: 0, page: 1 }) // khai báo [] tránh undefined khi render

    const fetchNewsList = async () => {
        const res = await getAllNews();
        setNewsList(res.DT)
        //console.log(res.DT);
    }

    useEffect(() => {
        fetchNewsList()
    }, [])
    return (
        <div className="container">
            <Link to="/news/create-article" className="d-flex justify-content-center mb-3">
                <Button className="px-5 py-3">Đăng tin tức mới</Button>
            </Link>
            <div className="news-list">
                {
                    newsList.items.map((item, index) => {
                        return (
                            <NewsItem key={index} data={item} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NewsPage