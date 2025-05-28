import { Link } from "react-router-dom";
import defaultNews from '../../assets/images/default-news.png'
const NewsItem = ({ data }) => {
    const { id, title, excerpt, image, createdAt } = data
    return (
        <div className="card mb-3 border-0 rounded" >
            <div className="d-flex  ">
                {image ? (
                    <div className="p-2">
                        <img src={image} alt="Thumbnail" className="img-fluid " style={{ objectFit: "cover", width: '400px', height: '260px', }} />
                    </div>
                )
                    :
                    (
                        <div className="p-2">
                            <img src={defaultNews} alt="Thumbnail" className="img-fluid " style={{ objectFit: "cover", width: '400px', height: '260px', }} />
                        </div>
                    )
                }
                <div className="">
                    <div className="card-body">
                        <Link to={`/news/article/${id}`} className="text-decoration-none text-dark">
                            <h4 className="card-title">{title}</h4>
                        </Link>
                        <p className="card-text py-2" style={{ fontSize: '1rem', fontStyle: 'italic' }}>{excerpt}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default NewsItem