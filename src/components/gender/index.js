import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * Two radio buttons for male / female gender selection
 */
function Gender(props) {
  const { familyId, handleChange } = props;
  const { t } = useTranslation();
  const genderName = familyId !== undefined ? `gender-${familyId}` : 'gender';
  const genderMale = familyId !== undefined ? `gender-male-${familyId}` : 'gender-male';
  const genderFemale = familyId !== undefined ? `gender-female-${familyId}` : 'gender-female';

  return (
    <div className="gender">
      <h2>{ t('h2-gender') }</h2>

      <div role="radiogroup" aria-required="true">
        <label htmlFor={genderMale}>
          <input
            id={genderMale}
            name={genderName}
            onChange={handleChange}
            type="radio"
            value="male"
          />
          { t('label-male') }
        </label>
        <label htmlFor={genderFemale}>
          <input
            id={genderFemale}
            name={genderName}
            onChange={handleChange}
            type="radio"
            value="female"
          />
          { t('label-female') }
        </label>
      </div>
    </div>
  );
}

/**
 * props
 * @param {number} familyId number representing the position witin the family data structure
 * @param {function} handleChange updates parent state
 */
Gender.propTypes = {
  familyId: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
};

Gender.defaultProps = {
  familyId: undefined,
};

export default Gender;
