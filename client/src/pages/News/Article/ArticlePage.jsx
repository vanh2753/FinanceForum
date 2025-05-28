import { getArticleById } from "../../../api/news/article-api"
import ArticleDisplay from "../../../components/News/ArticleDisplay"
import { useParams } from 'react-router-dom';
import { useState, useEffect, use } from "react"
const ArticlePage = () => {
    const [article, setArticle] = useState({})
    const { articleId } = useParams()

    const fetchArticle = async () => {
        const res = await getArticleById(articleId)
        setArticle(res.DT)
    }

    useEffect(() => {
        fetchArticle()
    }, [])
    return (
        <div>
            <ArticleDisplay data={article} />
        </div>
    )
}

export default ArticlePage