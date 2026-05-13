import { Link } from 'react-router-dom'

export default function ArticleCard({ article }) {
  const date = new Date(article.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

  return (
    <Link to={`/article/${article.id}`} className="article-card">
      <div className="card-meta">
        <span className="tag">Article</span>
        <span className="card-date">{date}</span>
      </div>
      <h2 className="card-title">{article.title}</h2>
      <p className="card-excerpt">{article.content?.slice(0, 120)}…</p>
      <div className="card-author">Par {article.authorEmail}</div>
    </Link>
  )
}