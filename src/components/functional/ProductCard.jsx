import CardWrapper from './CardWrapper'

export default function ProductCard({ product, onUpdateStock, onDelete }) {
  const getStockStatus = (stock) => {
    if (stock <= 0) return { label: 'Out of Stock', badgeClass: 'badge-out' }
    if (stock <= 5) return { label: 'Low Stock', badgeClass: 'badge-low' }
    return { label: 'In Stock', badgeClass: 'badge-in' }
  }

  const status = getStockStatus(product.stock)

  return (
    <CardWrapper className="product-card">
      <div className="product-header">
        <h4 className="product-title">{product.name}</h4>
        <span className={`badge ${status.badgeClass}`}>{status.label}</span>
      </div>
      <p className="product-category">Category: {product.category}</p>
      <p className="product-price">Price: ${Number(product.price).toFixed(2)}</p>
      <p className="product-stock">Stock: {product.stock} units</p>
      {product.description && (
        <p className="product-description">{product.description}</p>
      )}
      <div className="product-actions">
        <button
          onClick={() => onUpdateStock(product.id, product.stock - 1)}
          disabled={product.stock <= 0}
        >
          -1 Stock
        </button>
        <button onClick={() => onUpdateStock(product.id, product.stock + 1)}>
          +1 Stock
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </CardWrapper>
  )
}
