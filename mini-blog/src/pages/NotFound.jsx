import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page notfound">
      <div className="container">
        <p className="nf-code">404</p>
        <h1 className="nf-title">Page introuvable</h1>
        <p className="nf-sub">Cette page n'existe pas ou a été déplacée.</p>
        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
      </div>
    </div>
  )
}