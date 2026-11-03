import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { I18nProvider } from './i18n/I18nContext.jsx';
import { BagProvider } from './state/BagContext.jsx';
import '@fontsource/inter-tight/400.css';
import '@fontsource/inter-tight/500.css';
import '@fontsource/inter-tight/600.css';
// Hangul glyphs (Inter Tight has none); loaded only when Korean text is on screen.
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/500.css';
import '@fontsource/noto-sans-kr/600.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/collection.css';
import './styles/product.css';
import './styles/pages.css';
import './styles/bag.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <BagProvider>
        <App />
      </BagProvider>
    </I18nProvider>
  </StrictMode>,
);
