import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function ArticleDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getArticle(id)
      .then(setArticle)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!confirm('Supprimer cet article ?')) return
    await api.deleteArticle(id)
    navigate('/')
  }

  if (loading) return <div className="spinner" />

  const date = new Date(article.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
  const isAuthor = user?.id === article.authorId

  return (
    <div className="page">
      <div className="container">
        <Link to="/" className="back-link">← Retour</Link>
        <div className="detail-header">
          <div className="detail-meta">
            <span className="tag">Article</span>
            <span className="detail-date">{date}</span>
          </div>
          <h1 className="detail-title">{article.title}</h1>
          <p className="detail-author">Par {article.authorEmail}</p>
        </div>
        <div className="detail-content">{article.content}</div>
        {isAuthor && (
          <div className="detail-actions">
            <Link to={`/edit/${article.id}`} className="btn btn-outline btn-sm">Modifier</Link>
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>Supprimer</button>
          </div>
        )}
      </div>
    </div>
  )
}