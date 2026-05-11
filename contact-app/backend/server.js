const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

let contacts = [
];
let nextId = 4;


app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

app.get("/api/contacts/:id", (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) return res.status(404).json({ message: "Contact non trouvé" });
  res.json(contact);
});

app.post("/api/contacts", (req, res) => {
  const { firstname, lastname, email, phone } = req.body;

  if (!firstname || !lastname || !email || !phone) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  const newContact = { id: nextId++, firstname, lastname, email, phone };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.put("/api/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex((c) => c.id === id);

  if (index === -1) return res.status(404).json({ message: "Contact non trouvé" });

  const { firstname, lastname, email, phone } = req.body;

  if (!firstname || !lastname || !email || !phone) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  contacts[index] = { id, firstname, lastname, email, phone };
  res.json(contacts[index]);
});

app.delete("/api/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex((c) => c.id === id);

  if (index === -1) return res.status(404).json({ message: "Contact non trouvé" });

  const deleted = contacts.splice(index, 1);
  res.json({ message: "Contact supprimé", contact: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});