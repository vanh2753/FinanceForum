import ProductItem from './ProductItem'
import PaginationControls from '../Common/PaginationControls'
const ProductList = (props) => {
    const { products, page, totalPages, onPageChange } = props
    return (
        <div>
            <div className="row">
                {products.map((product, index) => (
                    <ProductItem key={index} product={product} />
                ))}
            </div>
            <PaginationControls page={page} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    )
}

export default ProductList