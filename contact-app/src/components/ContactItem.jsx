import { useState } from "react";

const AVATAR_COLORS = ["avatar-blue", "avatar-green", "avatar-amber"];

function initials(contact) {
  return (contact.firstname[0] + contact.lastname[0]).toUpperCase();
}

export default function ContactItem({ contact, colorIndex, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const avatarClass = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length];

  return (
    <tr>
      <td>
        <div className="cell-name">
          <div className={`avatar ${avatarClass}`}>{initials(contact)}</div>
          <span className="contact-name">
            {contact.firstname} {contact.lastname}
          </span>
        </div>
      </td>
      <td className="contact-muted">{contact.email}</td>
      <td className="contact-muted">{contact.phone}</td>
      <td>
        {confirmDelete ? (
          <div className="inline-confirm">
            <span className="inline-confirm-text">Confirmer ?</span>
            <button className="btn-cancel-sm" onClick={() => setConfirmDelete(false)}>Non</button>
            <button className="btn-confirm-del" onClick={onDelete}>Oui</button>
          </div>
        ) : (
          <div className="row-actions">
            <button className="btn-edit" onClick={onEdit}>✏️ Modifier</button>
            <button className="btn-del" onClick={() => setConfirmDelete(true)}>🗑 Supprimer</button>
          </div>
        )}
      </td>
    </tr>
  );
}