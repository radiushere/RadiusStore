import { useState, useEffect, useMemo, useCallback } from 'react'
import Header from './components/functional/Header'
import InventoryMetrics from './components/functional/InventoryMetrics'
import ProductForm from './components/functional/ProductForm'
import ProductList from './components/functional/ProductList'
import AuditLogger from './components/class/AuditLogger'
import './App.css'

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 89.99,
    stock: 14,
    description: 'Tactile mechanical switches with backlit keys.',
  },
  {
    id: 'prod-2',
    name: 'USB-C Multiport Hub',
    category: 'Electronics',
    price: 34.5,
    stock: 3,
    description: '7-in-1 USB-C adapter with 4K HDMI output.',
  },
  {
    id: 'prod-3',
    name: 'Ergonomic Desk Chair',
    category: 'Furniture',
    price: 199.0,
    stock: 0,
    description: 'Adjustable lumbar support and breathable mesh.',
  },
  {
    id: 'prod-4',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 24.99,
    stock: 8,
    description: 'Ergonomic optical mouse with silent clicks.',
  },
  {
    id: 'prod-5',
    name: 'Desk Pad Mat',
    category: 'Accessories',
    price: 18.0,
    stock: 25,
    description: 'Water-resistant micro-texture surface.',
  },
]

export default function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('radius_products')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return INITIAL_PRODUCTS
      }
    }
    return INITIAL_PRODUCTS
  })

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('radius_audit_logs')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return []
      }
    }
    return []
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [stockFilter, setStockFilter] = useState('All')
  const [showLogger, setShowLogger] = useState(true)

  useEffect(() => {
    localStorage.setItem('radius_products', JSON.stringify(products))
    document.title = `RadiusStore (${products.length} Products)`
  }, [products])

  const addLog = useCallback((type, message) => {
    const newEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      type,
      message,
      timestamp: new Date().toLocaleTimeString(),
    }
    setLogs((prev) => [newEntry, ...prev])
  }, [])

  const handleAddProduct = useCallback(
    (productData) => {
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
      }
      setProducts((prev) => [newProduct, ...prev])
      addLog(
        'ADDED',
        `Added "${newProduct.name}" (${newProduct.stock} units @ $${newProduct.price.toFixed(2)})`
      )
    },
    [addLog]
  )

  const handleUpdateStock = useCallback(
    (id, newStock) => {
      const clampedStock = Math.max(0, newStock)
      let targetProduct = null

      setProducts((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            targetProduct = item
            return { ...item, stock: clampedStock }
          }
          return item
        })
      )

      if (targetProduct) {
        addLog(
          'UPDATED',
          `Updated "${targetProduct.name}" stock: ${targetProduct.stock} -> ${clampedStock}`
        )
      }
    },
    [addLog]
  )

  const handleDeleteProduct = useCallback(
    (id) => {
      const target = products.find((p) => p.id === id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      if (target) {
        addLog('DELETED', `Deleted "${target.name}" from inventory`)
      }
    },
    [products, addLog]
  )

  const handleClearLogs = useCallback(() => {
    setLogs([])
  }, [])

  const handleSyncLogs = useCallback((initialLogs) => {
    setLogs(initialLogs)
  }, [])

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category))
    return Array.from(cats)
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory

      let matchesStock = true
      if (stockFilter === 'In Stock') {
        matchesStock = product.stock > 5
      } else if (stockFilter === 'Low Stock') {
        matchesStock = product.stock > 0 && product.stock <= 5
      } else if (stockFilter === 'Out of Stock') {
        matchesStock = product.stock === 0
      }

      return matchesSearch && matchesCategory && matchesStock
    })
  }, [products, searchTerm, selectedCategory, stockFilter])

  const metrics = useMemo(() => {
    const totalItems = products.length
    const totalUnits = products.reduce((acc, curr) => acc + curr.stock, 0)
    const totalValue = products.reduce(
      (acc, curr) => acc + curr.price * curr.stock,
      0
    )
    const lowStockCount = products.filter(
      (p) => p.stock > 0 && p.stock <= 5
    ).length
    const outOfStockCount = products.filter((p) => p.stock === 0).length

    return {
      totalItems,
      totalUnits,
      totalValue,
      lowStockCount,
      outOfStockCount,
    }
  }, [products])

  return (
    <div className="app-container">
      <Header totalProducts={products.length} />

      <main className="app-main">
        <InventoryMetrics metrics={metrics} />

        <div className="dashboard-grid">
          <section className="form-column">
            <ProductForm onAddProduct={handleAddProduct} />
            <div className="logger-toggle-bar">
              <button
                className="toggle-logger-btn"
                onClick={() => setShowLogger((prev) => !prev)}
              >
                {showLogger ? 'Hide Audit Logger' : 'Show Audit Logger'}
              </button>
            </div>
            {showLogger && (
              <AuditLogger
                logs={logs}
                onClearLogs={handleClearLogs}
                onSyncLogs={handleSyncLogs}
              />
            )}
          </section>

          <section className="list-column">
            <ProductList
              products={filteredProducts}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              stockFilter={stockFilter}
              onStockFilterChange={setStockFilter}
              categories={categories}
              onUpdateStock={handleUpdateStock}
              onDelete={handleDeleteProduct}
            />
          </section>
        </div>
      </main>
    </div>
  )
}
