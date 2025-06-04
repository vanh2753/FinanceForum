import ProductDetail from "../../components/ExpertView/ProductDetail";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/expert-view/product-api";

const ProductPage = () => {
    const { productId } = useParams()
    const [product, setProduct] = useState({})

    const fetchProduct = async () => {
        const res = await getProductById(productId)
        if (res.EC === 0) {
            setProduct(res.DT)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div>
            <ProductDetail product={product} />
        </div>
    );
};

export default ProductPage