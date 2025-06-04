import { Pagination } from "react-bootstrap";

const PaginationControls = ({ page, totalPages, onPageChange }) => {
    const items = [];

    for (let i = 1; i <= totalPages; i++) {
        items.push(
            <Pagination.Item
                key={i}
                active={i === page}
                onClick={() => onPageChange(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <div className="d-flex justify-content-center mt-4">
            <Pagination>
                {page > 1 && (
                    <Pagination.Prev onClick={() => onPageChange(page - 1)} />
                )}
                {items}
                <Pagination.Ellipsis />
                {page < totalPages && (
                    <Pagination.Next onClick={() => onPageChange(page + 1)} />
                )}
            </Pagination>
        </div>
    );
};

export default PaginationControls;
