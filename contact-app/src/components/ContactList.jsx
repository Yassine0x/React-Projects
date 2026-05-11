import ContactItem from "./ContactItem";

export default function ContactList({ contacts, onEdit, onDelete }) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📭</span>
        <p>Aucun contact trouvé.</p>
      </div>
    );
  }

  return (
    <table className="contacts-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact, i) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            colorIndex={i}
            onEdit={() => onEdit(contact)}
            onDelete={() => onDelete(contact.id)}
          />
        ))}
      </tbody>
    </table>
  );
}