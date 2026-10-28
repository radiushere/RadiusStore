export default function CardWrapper({ title, children, className = '', action }) {
  return (
    <div className={`card-wrapper ${className}`}>
      {title && (
        <div className="card-wrapper-header">
          <h3>{title}</h3>
          {action && <div className="card-wrapper-action">{action}</div>}
        </div>
      )}
      <div className="card-wrapper-content">
        {children}
      </div>
    </div>
  )
}
