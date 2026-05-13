const BASE = 'http://localhost:3000'

const headers = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

const req = async (method, path, body) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Erreur serveur')
  return data
}

export const api = {
  register: (body) => req('POST', '/register', body),
  login: (body) => req('POST', '/login', body),
  getArticles: () => req('GET', '/articles'),
  getArticle: (id) => req('GET', `/articles/${id}`),
  createArticle: (body) => req('POST', '/articles', body),
  updateArticle: (id, body) => req('PUT', `/articles/${id}`, body),
  deleteArticle: (id) => req('DELETE', `/articles/${id}`),
  myArticles: () => req('GET', '/my-articles'),
}