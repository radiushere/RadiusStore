import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme}>
      Theme: {theme === 'light' ? 'Light' : 'Dark'}
    </button>
  )
}
