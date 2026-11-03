import { useI18n } from '../i18n/I18nContext.jsx';
import GitHubLink from '../components/GitHubLink.jsx';

const STACK = ['React', 'JavaScript', 'Node.js', 'MongoDB', 'AI agents'];

export default function AboutView() {
  const { t } = useI18n();
  return (
    <div className="page">
      <div className="page__grid">
        <section className="reveal" aria-labelledby="about-title">
          <p className="eyebrow">{t('about.eyebrow')}</p>
          <p className="about__def">{t('about.def')}</p>
          <h1 id="about-title" className="page__title">{t('about.headline')}</h1>
          <p className="page__lede">{t('about.text')}</p>

          <h2 className="sr-only">{t('about.steps')}</h2>
          <ol className="steps">
            <li><span>01</span>{t('about.step1')}</li>
            <li><span>02</span>{t('about.step2')}</li>
            <li><span>03</span>{t('about.step3')}</li>
          </ol>

          <p className="page__note">{t('about.note')}</p>
          <p className="page__note page__note--credits">{t('about.credits')}</p>
          <a className="btn btn--ghost" href="#/">
            {t('about.cta')} <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section className="dev reveal" aria-labelledby="dev-name">
          <p className="eyebrow">{t('dev.eyebrow')}</p>
          <h2 id="dev-name" className="dev__name">Khoshimov Shukhratbek</h2>
          <p className="dev__role">{t('dev.role')}</p>
          <p className="dev__bio">{t('dev.bio')}</p>
          <h3 className="dev__label">{t('dev.stack')}</h3>
          <ul className="chips">
            {STACK.map((s) => <li key={s} className="chip">{s}</li>)}
          </ul>
          <GitHubLink />
        </section>
      </div>
    </div>
  );
}
