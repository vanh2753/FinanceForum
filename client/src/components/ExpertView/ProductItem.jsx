import { Link } from "react-router-dom";
import './productItem.scss'
const ProductItem = ({ product }) => {
    return (
        <Link to={`/expert/products/${product.id}`} className="item text-decoration-none text-white">
            <div className="p-3  mx-5 mt-3" style={{ cursor: "pointer" }}>
                <h5 className="mb-2">{product.title}</h5>
                <div className="">Ngôn ngữ: {product.language?.toUpperCase()}</div>
                <div className="small text-white">{new Date(product.createdAt).toLocaleDateString()}</div>
                <hr />
            </div>
        </Link>
    );
};

export default ProductItem;