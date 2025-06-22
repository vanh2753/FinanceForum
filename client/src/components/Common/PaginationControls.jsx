import { Pagination, Form } from "react-bootstrap";
import './pagination.scss'
const PaginationControls = ({ page, totalPages, onPageChange }) => {
    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 1 && value <= totalPages) {
            onPageChange(value);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
            <Pagination className="mb-0  custom-pagination">
                <Pagination.Prev
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}

                />
            </Pagination>

            <span className="text-white">Trang</span>
            <Form.Control
                type="number"
                value={page}
                min={1}
                max={totalPages}
                onChange={handleInputChange}
                style={{ width: "3.5rem" }}
            />
            <span className="text-white">/ {totalPages}</span>

            <Pagination className="mb-0  custom-pagination">
                <Pagination.Next
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                />
            </Pagination>
        </div>
    );
};

export default PaginationControls;
