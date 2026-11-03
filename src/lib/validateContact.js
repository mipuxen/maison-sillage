// Pure validation for the contact form. Returns { field: i18nKey } for each problem.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = { name: 80, email: 120, message: 2000 };

export function validateContact({ name = '', email = '', message = '' }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'contact.err.name';
  if (!EMAIL.test(email.trim())) errors.email = 'contact.err.email';
  if (message.trim().length < 10) errors.message = 'contact.err.message';
  return errors;
}
