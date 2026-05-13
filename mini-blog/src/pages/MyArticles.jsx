import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import ArticleCard from '../components/ArticleCard'

export default function MyArticles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.myArticles()
      .then(setArticles)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <div className="container">
        <div className="home-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="home-title">Mes articles</h1>
            <p className="home-sub">{articles.length} article{articles.length !== 1 ? 's' : ''} publié{articles.length !== 1 ? 's' : ''}</p>
          </div>
          <Link to="/create" className="btn btn-primary">+ Nouvel article</Link>
        </div>
        {loading ? (
          <div className="spinner" />
        ) : articles.length === 0 ? (
          <p className="empty">Vous n'avez pas encore d'articles.</p>
        ) : (
          <div className="articles-grid">
            {articles.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        )}
      </div>
    </div>
  )
}