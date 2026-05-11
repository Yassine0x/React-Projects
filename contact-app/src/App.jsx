import { useState, useEffect, useMemo } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./App.css";

const API = "http://localhost:3000/api/contacts";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");

  // ─── Fetch tous les contacts ───────────────────────────────
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API);
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      setError("Impossible de contacter le serveur. Vérifiez que le backend est démarré.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Filtrage & tri ────────────────────────────────────────
  const filteredContacts = useMemo(() => {
    const q = search.toLowerCase();
    let list = contacts.filter(
      (c) =>
        c.firstname.toLowerCase().includes(q) ||
        c.lastname.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
    if (sortOrder === "name-asc") list.sort((a, b) => a.lastname.localeCompare(b.lastname));
    else if (sortOrder === "name-desc") list.sort((a, b) => b.lastname.localeCompare(a.lastname));
    else if (sortOrder === "firstname") list.sort((a, b) => a.firstname.localeCompare(b.firstname));
    return list;
  }, [contacts, search, sortOrder]);

  // ─── Ajouter ──────────────────────────────────────────────
  const handleAdd = async (data) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setContacts((prev) => [...prev, created]);
      setShowForm(false);
    } catch {
      alert("Erreur lors de la création du contact.");
    }
  };

  // ─── Modifier ─────────────────────────────────────────────
  const handleEdit = async (data) => {
    try {
      const res = await fetch(`${API}/${editingContact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setEditingContact(null);
      setShowForm(false);
    } catch {
      alert("Erreur lors de la modification du contact.");
    }
  };

  // ─── Supprimer ────────────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Erreur lors de la suppression du contact.");
    }
  };

  const openEdit = (contact) => { setEditingContact(contact); setShowForm(true); };
  const openAdd  = () => { setEditingContact(null); setShowForm(true); };
  const closeForm = () => { setEditingContact(null); setShowForm(false); };

  // ─── Rendu ────────────────────────────────────────────────
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-title">
          <span className="header-icon">👤</span>
          <h1>Gestionnaire de contacts</h1>
        </div>
        <span className="count-badge">
          {contacts.length} contact{contacts.length !== 1 ? "s" : ""}
        </span>
      </header>

      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher un contact…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="name-asc">Nom A → Z</option>
          <option value="name-desc">Nom Z → A</option>
          <option value="firstname">Prénom A → Z</option>
        </select>
        <button className="btn-add" onClick={openAdd}>
          + Ajouter un contact
        </button>
      </div>

      {search && (
        <p className="search-info">
          {filteredContacts.length} résultat(s) pour « {search} »
        </p>
      )}

      {loading && <p className="status-msg">⏳ Chargement des contacts…</p>}
      {error   && <p className="status-msg error">{error}</p>}

      {!loading && !error && (
        <ContactList
          contacts={filteredContacts}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <ContactForm
          initialData={editingContact}
          onSubmit={editingContact ? handleEdit : handleAdd}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}