import { useState, useRef, useEffect } from 'react'
import CardWrapper from './CardWrapper'

export default function ProductForm({ onAddProduct }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const titleInputRef = useRef(null)

  useEffect(() => {
    titleInputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim() || !category.trim() || price === '' || stock === '') {
      setError('Please fill in all required fields.')
      return
    }

    if (Number(price) < 0 || Number(stock) < 0) {
      setError('Price and stock cannot be negative.')
      return
    }

    onAddProduct({
      name: name.trim(),
      category: category.trim(),
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      description: description.trim(),
    })

    setName('')
    setCategory('')
    setPrice('')
    setStock('')
    setDescription('')
    setError('')

    titleInputRef.current?.focus()
  }

  return (
    <CardWrapper title="Add New Product" className="product-form-card">
      <form onSubmit={handleSubmit} className="product-form">
        {error && <div className="form-error">{error}</div>}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="product-name">Product Name *</label>
            <input
              id="product-name"
              ref={titleInputRef}
              type="text"
              placeholder="e.g. Wireless Mouse"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-category">Category *</label>
            <input
              id="product-category"
              type="text"
              placeholder="e.g. Electronics"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="product-price">Price ($) *</label>
            <input
              id="product-price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-stock">Stock Quantity *</label>
            <input
              id="product-stock"
              type="number"
              min="0"
              placeholder="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="product-desc">Description</label>
          <textarea
            id="product-desc"
            rows="2"
            placeholder="Brief item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </CardWrapper>
  )
}
