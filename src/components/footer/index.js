import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Footer testing criteria
 */
function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <h3>{ t('h3-testing') }</h3>
      <ul>
        <li>{ t('footer-condition-1') }:</li>
        <ul>
          <li>{ t('footer-condition-1-item-1') }</li>
          <li>{ t('footer-condition-1-item-2') }</li>
          <li>{ t('footer-condition-1-item-3') }</li>
          <li>{ t('footer-condition-1-item-4') }</li>
        </ul>
        <li>{ t('footer-condition-2') }:</li>
        <ul>
          <li>{ t('footer-condition-2-item-1') }</li>
          <li>{ t('footer-condition-2-item-2') }</li>
        </ul>
        <li>{ t('footer-condition-3') }</li>
      </ul>
    </footer>
  );
}

export default Footer;
