import { useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getArticlesForHomeSection } from "../../api/news/article-api";
import "./carousel.scss";
import defaultNews from "../../assets/images/default-news.png";
const NewsCarousel = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const res = await getArticlesForHomeSection();
    if (res.EC === 0) {
      setArticles(res.DT);
      //console.log(res.DT);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="container">
      <h3 className="text-light mb-4 d-flex justify-content-center">
        Tin tức nổi bật
      </h3>
      <Carousel interval={4000} pause="hover">
        {articles.map((article) => (
          <Carousel.Item key={article.id}>
            <Link
              to={`/news/article/${article.id}`}
              className="text-decoration-none"
            >
              <div className="carousel-item-card">
                <div className="carousel-image-frame">
                  <img
                    src={article.image || defaultNews}
                    alt={article.title}
                    className="carousel-image"
                  />
                </div>
                <h4 className="carousel-title text-light">{article.title}</h4>
                <p className="carousel-excerpt text-light">{article.excerpt}</p>
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default NewsCarousel;
