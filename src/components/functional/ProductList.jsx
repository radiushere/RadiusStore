import ProductCard from './ProductCard'

export default function ProductList({
  products,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  stockFilter,
  onStockFilterChange,
  categories,
  onUpdateStock,
  onDelete,
}) {
  return (
    <div className="product-list-container">
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={stockFilter}
          onChange={(e) => onStockFilterChange(e.target.value)}
        >
          <option value="All">All Stock Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No products found in inventory.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onUpdateStock={onUpdateStock}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
