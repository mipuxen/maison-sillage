import { useRef, useState } from 'react';
import { useI18n } from '../i18n/I18nContext.jsx';
import { LIMITS, validateContact } from '../lib/validateContact.js';
import GitHubLink from '../components/GitHubLink.jsx';

const EMPTY = { name: '', email: '', message: '' };
const FIELDS = ['name', 'email', 'message'];

// Demo form: validates in the browser, never sends anything (there is no backend).
export default function ContactView() {
  const { t } = useI18n();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [tried, setTried] = useState(false);
  const [sentName, setSentName] = useState('');
  const sentRef = useRef(null);
  const formRef = useRef(null);

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (tried) setErrors(validateContact(next)); // live feedback only after the first attempt
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validateContact(values);
    setTried(true);
    setErrors(found);
    const first = FIELDS.find((f) => found[f]);
    if (first) {
      formRef.current?.elements[first]?.focus();
      return;
    }
    setSentName(values.name.trim());
    setValues(EMPTY);
    setTried(false);
    requestAnimationFrame(() => sentRef.current?.focus());
  };

  const field = (name, type = 'text') => {
    const id = `contact-${name}`;
    const err = errors[name];
    const props = {
      id,
      name,
      value: values[name],
      onChange,
      maxLength: LIMITS[name],
      'aria-invalid': Boolean(err),
      'aria-describedby': err ? `${id}-error` : undefined,
    };
    return (
      <div className="field">
        <label htmlFor={id}>{t(`contact.${name}`)}</label>
        {type === 'textarea' ? (
          <textarea {...props} rows={6} />
        ) : (
          <input {...props} type={type} autoComplete={name === 'email' ? 'email' : 'name'} />
        )}
        <p id={`${id}-error`} className="field__error">{err ? t(err) : ''}</p>
      </div>
    );
  };

  return (
    <div className="page">
      <div className="page__grid">
        <section className="reveal" aria-labelledby="contact-title">
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h1 id="contact-title" className="page__title">{t('contact.headline')}</h1>
          <p className="page__lede">{t('contact.text')}</p>
          <div className="contact__links">
            <p className="dev__label">{t('contact.elsewhere')}</p>
            <GitHubLink caption={t('contact.github')} />
          </div>
        </section>

        <section className="reveal">
          {sentName ? (
            <div className="sent" role="status">
              <h2 ref={sentRef} tabIndex={-1} className="sent__title">
                {t('contact.sentTitle', { name: sentName })}
              </h2>
              <p className="sent__text">{t('contact.sentText')}</p>
              <button type="button" className="btn btn--ghost" onClick={() => setSentName('')}>
                {t('contact.again')}
              </button>
            </div>
          ) : (
            <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-label={t('contact.form')}>
              {field('name')}
              {field('email', 'email')}
              {field('message', 'textarea')}
              <p className="form__demo">{t('contact.demo')}</p>
              <button type="submit" className="btn">{t('contact.submit')}</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
