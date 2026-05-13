import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import ArticleForm from '../components/ArticleForm'

export default function EditArticle() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.getArticle(id).then(a => {
      if (a.authorId !== user?.id) return navigate('/')
      setArticle(a)
    }).catch(() => navigate('/'))
  }, [id])

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      await api.updateArticle(id, data)
      navigate(`/article/${id}`)
    } finally {
      setLoading(false)
    }
  }

  if (!article) return <div className="spinner" />

  return (
    <div className="page">
      <div className="container editor-container">
        <div className="editor-header">
          <span className="tag">Édition</span>
          <h1 className="editor-title">Modifier l'article</h1>
        </div>
        <ArticleForm onSubmit={handleSubmit} initial={article} loading={loading} />
      </div>
    </div>
  )
}