import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import ArticleForm from '../components/ArticleForm'

export default function CreateArticle() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      const article = await api.createArticle(data)
      navigate(`/article/${article.id}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="container editor-container">
        <div className="editor-header">
          <span className="tag">Nouveau</span>
          <h1 className="editor-title">Créer un article</h1>
        </div>
        <ArticleForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  )
}