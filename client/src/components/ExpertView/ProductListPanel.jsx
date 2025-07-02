import { useState, useEffect } from "react"
import { Table, Button, Modal } from "react-bootstrap";
import { getMyProducts, deleteProduct } from "../../api/expert-view/product-api";
import PaginationControls from "../../components/Common/PaginationControls";

const ProductListPanel = () => {

    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8

    const fetchproduct = async (page) => {
        const res = await getMyProducts(page, limit);
        if (res.EC === 0) {
            setProducts(res.DT.products);
            setPage(res.DT.currentPage);
            setTotalPages(res.DT.totalPages);
        }
    }

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;

        const res = await deleteProduct(productToDelete.id);
        if (res.EC === 0) {
            setProducts(products.filter(p => p.id !== productToDelete.id));
            setShowDeleteModal(false);
            setProductToDelete(null);
        }
    };


    useEffect(() => {
        fetchproduct(page);
    }, [page])

    return (
        <div>
            <h3 className="text-light mb-4 text-center">Danh sách sản phẩm</h3>

            <Table bordered hover responsive>
                <thead>
                    <tr className="text-nowrap">
                        <th className="text-center">Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Lượt mua</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td ><a href={`/expert/products/${product.id}`} className="text-decoration-none text-dark" target="_blank" >{product.title}</a>
                            </td>
                            <td className="text-nowrap">{product.price} $</td>
                            <td>{product.views || 0}</td>
                            <td className="text-nowrap" >
                                <div className="d-flex gap-3">
                                    <Button
                                        variant="info"
                                        size="sm"
                                        className="flex-fill"
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setShowModal(true);
                                        }}
                                    >
                                        Xem chi tiết
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="flex-fill"
                                        onClick={() => {
                                            setProductToDelete(product);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Xóa
                                    </Button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {totalPages > 1 && (
                <PaginationControls
                    page={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            )}

            {/* Modal xóa sản phẩm */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa sản phẩm <strong>{productToDelete?.title}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ProductListPanel