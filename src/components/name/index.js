import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * Selections for first name and last name
 */
function Name(props) {
  const { firstName, lastName, handleChange } = props;
  const { t } = useTranslation();

  return (
    <div className="name">
      <h2>{ t('h2-name') }</h2>
      <input
        aria-label="First Name"
        aria-required="true"
        name="firstName"
        onChange={handleChange}
        placeholder={t('placeholder-firstName')}
        type="text"
        value={firstName}
      />
      <input
        aria-label="Last Name"
        aria-required="true"
        name="lastName"
        onChange={handleChange}
        placeholder={t('placeholder-lastName')}
        type="text"
        value={lastName}
      />
    </div>
  );
}

/**
 * props
 * @param {string} firstName patient first name
 * @param {string} lastName patient last name
 * @param {function} handleChange updates parent state
 */
Name.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Name;
