import { Link } from "react-router-dom";
import './productItem.scss'
const ProductItem = ({ product }) => {
    return (
        <Link to={`/expert/products/${product.id}`} className=" text-decoration-none text-white">
            <div className=" mx-5 mt-3" style={{ cursor: "pointer", }}>
                <div className="item">
                    <h4 className="mb-4">{product.title}</h4>
                    <div style={{ fontStyle: 'italic' }}>Ngôn ngữ: {product.language?.toUpperCase()}</div>
                    <div className="pb-3" style={{ fontStyle: 'italic' }}>{new Date(product.createdAt).toLocaleDateString()}</div>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;