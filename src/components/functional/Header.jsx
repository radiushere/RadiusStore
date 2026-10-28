import ThemeToggle from './ThemeToggle'

export default function Header({ totalProducts }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <h1>RadiusStore</h1>
        <span className="header-subtitle">Inventory & Stock Dashboard</span>
      </div>
      <div className="header-controls">
        <span className="header-count">Active Items: {totalProducts}</span>
        <ThemeToggle />
      </div>
    </header>
  )
}
