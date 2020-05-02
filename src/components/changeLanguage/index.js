import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Changes the application's language preset
 */
function ChangeLanguage() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language">
      <button
        className={i18n.language === 'en' ? 'selected' : ''}
        onClick={() => { changeLanguage('en'); }}
        type="button"
      >
        en
      </button>
      <button
        className={i18n.language === 'es' ? 'selected' : ''}
        onClick={() => { changeLanguage('es'); }}
        type="button"
      >
        es
      </button>
    </div>
  );
}

export default ChangeLanguage;
