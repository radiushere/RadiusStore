import CardWrapper from './CardWrapper'

export default function InventoryMetrics({ metrics }) {
  const { totalItems, totalUnits, totalValue, lowStockCount, outOfStockCount } = metrics

  return (
    <div className="metrics-grid">
      <CardWrapper className="metric-box">
        <span className="metric-label">Total Products</span>
        <span className="metric-value">{totalItems}</span>
      </CardWrapper>

      <CardWrapper className="metric-box">
        <span className="metric-label">Total Units</span>
        <span className="metric-value">{totalUnits}</span>
      </CardWrapper>

      <CardWrapper className="metric-box">
        <span className="metric-label">Inventory Value</span>
        <span className="metric-value">${totalValue.toFixed(2)}</span>
      </CardWrapper>

      <CardWrapper className="metric-box">
        <span className="metric-label">Low Stock</span>
        <span className="metric-value warning">{lowStockCount}</span>
      </CardWrapper>

      <CardWrapper className="metric-box">
        <span className="metric-label">Out of Stock</span>
        <span className="metric-value danger">{outOfStockCount}</span>
      </CardWrapper>
    </div>
  )
}
