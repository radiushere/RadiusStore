import { Component } from 'react'
import CardWrapper from '../functional/CardWrapper'

export default class AuditLogger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: [],
      toastMessage: '',
      windowWidth: window.innerWidth,
    }
    this.toastTimer = null
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.clearLogs = this.clearLogs.bind(this)
  }

  componentDidMount() {
    const saved = localStorage.getItem('radius_audit_logs')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        this.setState({ logs: parsed })
        if (this.props.onSyncLogs) {
          this.props.onSyncLogs(parsed)
        }
      } catch (e) {
        console.error(e)
      }
    }
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.logs !== this.props.logs && this.props.logs !== this.state.logs) {
      this.setState({ logs: this.props.logs })
    }

    if (prevState.logs !== this.state.logs) {
      localStorage.setItem('radius_audit_logs', JSON.stringify(this.state.logs))

      if (this.state.logs.length > prevState.logs.length) {
        const latest = this.state.logs[0]
        if (latest) {
          if (this.toastTimer) {
            clearTimeout(this.toastTimer)
          }
          this.setState({ toastMessage: latest.message })
          this.toastTimer = setTimeout(() => {
            this.setState({ toastMessage: '' })
          }, 3500)
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer)
    }
    window.removeEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize() {
    this.setState({ windowWidth: window.innerWidth })
  }

  clearLogs() {
    this.setState({ logs: [], toastMessage: 'Audit logs cleared' })
    localStorage.removeItem('radius_audit_logs')
    if (this.props.onClearLogs) {
      this.props.onClearLogs()
    }
  }

  render() {
    const { logs, toastMessage } = this.state

    return (
      <CardWrapper
        title="Audit Activity Logger"
        className="audit-logger-card"
        action={
          <button className="clear-btn" onClick={this.clearLogs}>
            Clear Logs
          </button>
        }
      >
        {toastMessage && (
          <div className="toast-notification">
            <strong>Notification:</strong> {toastMessage}
          </div>
        )}

        <div className="audit-logger-content">
          {logs.length === 0 ? (
            <p className="empty-logs">No audit records yet.</p>
          ) : (
            <ul className="audit-list">
              {logs.map((log) => (
                <li key={log.id} className={`audit-item audit-${log.type.toLowerCase()}`}>
                  <span className="audit-time">{log.timestamp}</span>
                  <span className={`audit-badge badge-${log.type.toLowerCase()}`}>
                    {log.type}
                  </span>
                  <span className="audit-msg">{log.message}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardWrapper>
    )
  }
}
