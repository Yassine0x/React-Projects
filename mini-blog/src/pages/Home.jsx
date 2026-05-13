import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import ArticleCard from '../components/ArticleCard'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getArticles()
      .then(setArticles)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <div className="container">
        <div className="home-header">
          <h1 className="home-title">Le Blog</h1>
          <p className="home-sub">Tous les articles publiés par la communauté.</p>
        </div>
        {loading ? (
          <div className="spinner" />
        ) : articles.length === 0 ? (
          <p className="empty">Aucun article pour le moment.</p>
        ) : (
          <div className="articles-grid">
            {articles.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        )}
      </div>
    </div>
  )
}