import { useEffect, useState } from "react";
import { getProductList } from "../../api/expert-view/product-api";
import ProductList from '../../components/ExpertView/ProductList'
const ExpertViewPage = () => {
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({ page: 1, totalPages: 10 });
    const limit = 10;

    const fetchProducts = async (page) => {
        const res = await getProductList(page, limit);
        if (res.EC === 0) {
            setProducts(res.DT.products);
            setPageInfo({ page: res.DT.currentPage, totalPages: res.DT.totalPages });
        }
    }

    useEffect(() => {
        fetchProducts(1);
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-2 pe-3">
                    {/* Filter component ở đây sau cũng được */}
                    <div className="text-white">Filter (tạm trống)</div>
                </div>
                <div className="col-10">
                    <ProductList
                        products={products}
                        page={pageInfo.page}
                        totalPages={pageInfo.totalPages}
                        onPageChange={fetchProducts}
                    />
                </div>
            </div>
        </div>
    )
}

export default ExpertViewPage