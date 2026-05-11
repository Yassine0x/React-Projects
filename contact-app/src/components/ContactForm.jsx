import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const EMPTY_FORM = { firstname: "", lastname: "", email: "", phone: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\+\-\(\)]{6,20}$/;

export default function ContactForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialData ? { ...initialData } : EMPTY_FORM);
    setErrors({});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.firstname.trim()) errs.firstname = "Le prénom est requis.";
    if (!form.lastname.trim()) errs.lastname = "Le nom est requis.";
    if (!EMAIL_RE.test(form.email.trim())) errs.email = "Adresse email invalide.";
    if (!PHONE_RE.test(form.phone.trim())) errs.phone = "Numéro de téléphone invalide.";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit({
      firstname: form.firstname.trim(),
      lastname: form.lastname.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });
  };

  const isEditing = Boolean(initialData);

  return createPortal(
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? "Modifier le contact" : "Ajouter un contact"}</h2>
          <button className="modal-close" onClick={onCancel} aria-label="Fermer">×</button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstname">Prénom</label>
            <input id="firstname" name="firstname" type="text" value={form.firstname}
              onChange={handleChange} placeholder="Jean"
              className={errors.firstname ? "input-error" : ""} />
            {errors.firstname && <span className="field-error">{errors.firstname}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Nom</label>
            <input id="lastname" name="lastname" type="text" value={form.lastname}
              onChange={handleChange} placeholder="Dupont"
              className={errors.lastname ? "input-error" : ""} />
            {errors.lastname && <span className="field-error">{errors.lastname}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email}
            onChange={handleChange} placeholder="jean.dupont@exemple.fr"
            className={errors.email ? "input-error" : ""} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Téléphone</label>
          <input id="phone" name="phone" type="tel" value={form.phone}
            onChange={handleChange} placeholder="06 12 34 56 78"
            className={errors.phone ? "input-error" : ""} />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onCancel}>Annuler</button>
          <button className="btn-save" onClick={handleSubmit}>
            {isEditing ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}