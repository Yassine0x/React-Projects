import { useState } from 'react'

export default function ArticleForm({ onSubmit, initial = {}, loading }) {
  const [title, setTitle] = useState(initial.title || '')
  const [content, setContent] = useState(initial.content || '')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return setError('Tous les champs sont requis.')
    setError('')
    onSubmit({ title, content })
  }

  return (
    <form className="article-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <label>Titre</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre de l'article" />
      </div>
      <div className="form-group">
        <label>Contenu</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} rows={10} placeholder="Rédigez votre article…" />
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Envoi…' : 'Publier'}
      </button>
    </form>
  )
}