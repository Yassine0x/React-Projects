# Mini Blog

Application web full-stack permettant à des utilisateurs de s'inscrire, se connecter, et gérer des articles de blog.

## Stack technique

**Frontend** — React 18, React Router v6, Vite  
**Backend** — Node.js, Express, JWT, bcryptjs

---

## Installation & lancement

### 1. Cloner le dépôt

```bash
cd mini-blog
```

### 2. Backend

```bash
cd backend
npm install
```

Créer le fichier `.env` :

```env
JWT_SECRET_TOKEN=ton_secret_super_secure
```

Lancer le serveur :

```bash
node server.js
```

> Le backend tourne sur **http://localhost:3000**

### 3. Frontend

Dans un nouveau terminal :

```bash
cd mini-blog
npm install
npm run dev
```

> Le frontend tourne sur **http://localhost:5173**

---

## Structure du projet

```
mini-blog/
├── backend/
│   ├── server.js
│   └── .env
└── mini-blog/              ← frontend
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── context/
        │   └── AuthContext.jsx
        ├── lib/
        │   └── api.js
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ProtectedRoute.jsx
        │   ├── ArticleCard.jsx
        │   └── ArticleForm.jsx
        └── pages/
            ├── Home.jsx
            ├── Login.jsx
            ├── Register.jsx
            ├── ArticleDetail.jsx
            ├── CreateArticle.jsx
            ├── EditArticle.jsx
            ├── MyArticles.jsx
            └── NotFound.jsx
```

---

## Routes de l'application

| Chemin | Accès | Description |
|---|---|---|
| `/` | Public | Liste de tous les articles |
| `/article/:id` | Public | Détail d'un article |
| `/login` | Public | Formulaire de connexion |
| `/register` | Public | Formulaire d'inscription |
| `/create` | Privé | Créer un article |
| `/edit/:id` | Privé (auteur) | Modifier un article |
| `/my-articles` | Privé | Mes articles |
| `*` | Public | Page 404 |

## Routes API

| Méthode | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | Non | Inscription |
| POST | `/login` | Non | Connexion |
| GET | `/articles` | Non | Liste des articles |
| GET | `/articles/:id` | Non | Détail d'un article |
| POST | `/articles` | Oui | Créer un article |
| PUT | `/articles/:id` | Oui | Modifier un article |
| DELETE | `/articles/:id` | Oui | Supprimer un article |
| GET | `/my-articles` | Oui | Articles de l'utilisateur connecté |

---

## Fonctionnalités

- Inscription et connexion avec mot de passe hashé (bcryptjs)
- Authentification par token JWT (24h) stocké dans le localStorage
- Redirection automatique vers `/login` pour les pages protégées
- Création, modification et suppression d'articles (auteur uniquement)
- Navbar dynamique selon l'état de connexion
- Page 404 pour les routes inexistantes