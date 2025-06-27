import { useEffect, useState } from "react";
import { getFilteredProducts, getProductList } from "../../api/expert-view/product-api";
import ProductList from '../../components/ExpertView/ProductList';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ExpertViewPage = () => {
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({ page: 1, totalPages: 1 });

    // Filters
    const [searchInput, setSearchInput] = useState('');
    const [author, setAuthor] = useState('');
    const [language, setLanguage] = useState('');

    const isExpert = useSelector(state => state.userInfo.user?.isExpert);
    const navigate = useNavigate();

    const limit = 10;


    const fetchProducts = async (page = 1) => {
        if (!searchInput && !author && !language) {
            const res = await getProductList(page, limit);
            if (res.EC === 0) {
                setProducts(res.DT.products);
                setPageInfo({ page: res.DT.currentPage, totalPages: res.DT.totalPages });
            }
        } else {
            const res = await getFilteredProducts(searchInput, author, language, page, limit);
            if (res.EC === 0) {
                setProducts(res.DT.products);
                setPageInfo({ page: res.DT.currentPage, totalPages: res.DT.totalPages });
            }
        }
    };

    useEffect(() => {
        fetchProducts(1); // chỉ gọi 1 lần khi vào trang
    }, []);


    return (
        <div className="container mt-4">
            <div className="row">
                {/* Cột Filter */}
                <div className="col-md-3">
                    {isExpert && (
                        <button
                            className="btn btn-primary mt-4 w-100 fw-bold"
                            onClick={() => navigate('expert-dashboard')}
                        >
                            🛠 Quản lý sản phẩm
                        </button>
                    )}
                    <div className="text-white p-3" style={{ marginTop: '2rem' }}>
                        <h3 className="mb-4" style={{ fontStyle: 'italic' }}>Tìm kiếm:</h3>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Bạn muốn tìm gì?</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nội dung"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Tác giả</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tên tác giả"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Ngôn ngữ</label>
                            <select
                                className="form-select"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="">-- Tất cả --</option>
                                <option value="vietnamese">Tiếng Việt</option>
                                <option value="english">Tiếng Anh</option>
                            </select>
                        </div>
                        <button
                            className="btn btn-primary mt-2"
                            onClick={() => {
                                setSearchInput(searchInput);
                                setAuthor(author);
                                setLanguage(language);
                                fetchProducts(1);
                            }}
                        >
                            Tìm kiếm
                        </button>

                    </div>
                </div>

                {/* Cột Danh sách */}
                <div className="col-md-9">
                    <ProductList
                        products={products}
                        page={pageInfo.page}
                        totalPages={pageInfo.totalPages}
                        onPageChange={fetchProducts}
                    />
                </div>
            </div>
        </div >
    );
};

export default ExpertViewPage;
