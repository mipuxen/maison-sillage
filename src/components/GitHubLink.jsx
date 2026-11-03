import { useI18n } from '../i18n/I18nContext.jsx';

export const GITHUB_USER = 'mipuxen';

export default function GitHubLink({ caption }) {
  const { t } = useI18n();
  return (
    <a
      className="gh-link"
      href={`https://github.com/${GITHUB_USER}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="gh-link__emoji" aria-hidden="true">🐙</span>
      <span className="gh-link__text">
        <span className="gh-link__label">{t('dev.github')}</span>
        <span className="gh-link__user">github.com/{GITHUB_USER}</span>
        {caption && <span className="gh-link__caption">{caption}</span>}
      </span>
      <span className="gh-link__arrow" aria-hidden="true">↗</span>
    </a>
  );
}
