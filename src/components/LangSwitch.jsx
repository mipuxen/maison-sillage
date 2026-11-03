import { LANGS, LANG_LABELS, LANG_NAMES } from '../i18n/index.js';
import { useI18n } from '../i18n/I18nContext.jsx';

export default function LangSwitch({ className = '' }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`lang ${className}`.trim()} role="group" aria-label={t('lang.label')}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className="lang__btn"
          aria-pressed={code === lang}
          lang={code}
          title={LANG_NAMES[code]}
          onClick={() => setLang(code)}
        >
          <span aria-hidden="true">{LANG_LABELS[code]}</span>
          <span className="sr-only">{LANG_NAMES[code]}</span>
        </button>
      ))}
    </div>
  );
}
