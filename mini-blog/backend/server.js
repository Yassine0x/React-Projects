require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const app = express()
app.use(cors())
app.use(express.json())

const SECRET = process.env.JWT_SECRET_TOKEN

let users = []
let articles = []
let nextUserId = 1
let nextArticleId = 1

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Non autorisé' })
  try {
    req.user = jwt.verify(token, SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Token invalide' })
  }
}

app.post('/register', async (req, res) => {
  const { email, password } = req.body
  if (users.find(u => u.email === email))
    return res.status(400).json({ message: 'Email déjà utilisé' })
  const hashed = await bcrypt.hash(password, 10)
  users.push({ id: nextUserId++, email, password: hashed })
  res.status(201).json({ message: 'Inscription réussie' })
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Identifiants incorrects' })
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '24h' })
  res.json({ token, user: { id: user.id, email: user.email } })
})

app.get('/articles', (req, res) => {
  res.json(articles)
})

app.get('/articles/:id', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id))
  if (!article) return res.status(404).json({ message: 'Article non trouvé' })
  res.json(article)
})

app.post('/articles', auth, (req, res) => {
  const { title, content } = req.body
  const article = {
    id: nextArticleId++,
    title,
    content,
    authorId: req.user.id,
    authorEmail: req.user.email,
    createdAt: new Date().toISOString()
  }
  articles.push(article)
  res.status(201).json(article)
})

app.put('/articles/:id', auth, (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id))
  if (!article) return res.status(404).json({ message: 'Article non trouvé' })
  if (article.authorId !== req.user.id) return res.status(403).json({ message: 'Interdit' })
  article.title = req.body.title ?? article.title
  article.content = req.body.content ?? article.content
  res.json(article)
})

app.delete('/articles/:id', auth, (req, res) => {
  const index = articles.findIndex(a => a.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Article non trouvé' })
  if (articles[index].authorId !== req.user.id) return res.status(403).json({ message: 'Interdit' })
  articles.splice(index, 1)
  res.json({ message: 'Supprimé' })
})

app.get('/my-articles', auth, (req, res) => {
  res.json(articles.filter(a => a.authorId === req.user.id))
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))