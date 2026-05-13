import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-dot" />
          MiniBlog
        </Link>
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/create" className={`nav-link ${pathname === '/create' ? 'active' : ''}`}>
                + Nouvel article
              </Link>
              <Link to="/my-articles" className={`nav-link ${pathname === '/my-articles' ? 'active' : ''}`}>
                Mes articles
              </Link>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`nav-link ${pathname === '/login' ? 'active' : ''}`}>
                Connexion
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}