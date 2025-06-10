import { Link } from "react-router-dom";
import defaultNews from '../../assets/images/default-news.png'
const NewsItem = ({ data }) => {
    const { id, title, excerpt, image } = data;
    const thumbnail = image || defaultNews;

    return (
        <div className="card mb-3 border-0 rounded">
            <div className="d-flex">
                <div
                    className="m-2"
                    style={{
                        width: '400px',
                        height: '260px',
                        backgroundImage: `url(${image || defaultNews})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        flexShrink: 0,
                    }}
                />

                <div className="flex-grow-1">
                    <div className="card-body">
                        <Link to={`/news/article/${id}`} className="text-decoration-none text-dark">
                            <h4 className="card-title">{title}</h4>
                        </Link>
                        <p className="card-text py-2" style={{ fontSize: '1rem', fontStyle: 'italic' }}>
                            {excerpt}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsItem