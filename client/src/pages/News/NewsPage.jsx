import { Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import NewsItem from "../../components/News/NewsItem"
import { getAllNews } from "../../api/news/article-api"
import { useSelector, useDispatch } from 'react-redux'

const NewsPage = () => {
    const [newsList, setNewsList] = useState({ items: [], total: 0, page: 1 }) // khai báo [] tránh undefined khi render
    const user = useSelector(state => state.userInfo?.user)
    console.log(user)
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
            {
                user?.role === 'mod' && (
                    <Link to="/news/create-article" className="d-flex justify-content-center mb-3">
                        <Button className="px-5 py-3">Đăng tin tức mới</Button>
                    </Link>
                )
            }

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