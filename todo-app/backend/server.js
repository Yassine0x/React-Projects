const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

app.use(cors())
app.use(express.json())

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

const users = []; 
const todos = [];

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ message: 'Email déjà utilisé' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { id: users.length + 1, email, password: hashedPassword };
  users.push(user);

  res.status(201).json({ message: 'Utilisateur créé' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: 'Identifiants invalides' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET_TOKEN, { expiresIn: '24h' });

  res.json({ token });
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    req.user = jwt.verify(token, JWT_SECRET_TOKEN);
    next();
  } catch {
    res.status(401).json({ message: 'Token invalide' });
  }
};

app.get('/todos', authMiddleware, (req, res) => {
  const userTodos = todos.filter(t => t.userId === req.user.id);
  res.json(userTodos);
});

app.post('/todos', authMiddleware, (req, res) => {
  const { title } = req.body;
  const todo = { id: todos.length + 1, userId: req.user.id, title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/todos/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = todos.find(t => t.id === parseInt(id) && t.userId === req.user.id);
  if (!todo) return res.status(404).json({ message: 'Tâche non trouvée' });

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

app.delete('/todos/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex(t => t.id === parseInt(id) && t.userId === req.user.id);
  if (index === -1) return res.status(404).json({ message: 'Tâche non trouvée' });

  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () =>{
    console.log('Application listening on port 3000')
})