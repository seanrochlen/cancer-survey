import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * Selections for mother and father
 */
function MotherFatherIds(props) {
  const { fatherId, motherId, family, familyId, handleChange } = props;
  const { t } = useTranslation();

  // filter by gender and not current family member being displayed
  const familyFilteredByFemales = family.filter((person) => {
    if (familyId !== undefined)
      return person.gender === 'female' && person.id !== '' && person.id !== family[familyId].id;
    if (motherId !== null)
      return person.id;
    return person.gender === 'female' && person.id !== '';
  });

  const familyFilteredByMales = family.filter((person) => {
    if (familyId !== undefined)
      return person.gender === 'male' && person.id !== '' && person.id !== family[familyId].id;
    if (fatherId !== null)
      return person.id;
    return person.gender === 'male' && person.id !== '';
  });

  // map options for selections of possibly family members
  const motherIdOptions = familyFilteredByFemales.map((person) => {
    return <option key={person.id} value={person.name}>{person.name}</option>;
  });
  const fatherIdOptions = familyFilteredByMales.map((person) => {
    return <option key={person.id} value={person.name}>{person.name}</option>;
  });

  return (
    <div className="motherFather-holder">
      <h2>{ t('h2-parents') }</h2>

      <div className="row">
        {motherIdOptions.length > 0 && (
        <div className="select-holder">
          <select
            name={familyId !== undefined ? `motherId-${familyId}` : 'motherId'}
            onChange={handleChange}
            value={motherId}
          >
            <option value="" disabled>{ t('option-mother') }</option>
            {motherIdOptions}
          </select>
        </div>
        )}
        {fatherIdOptions.length > 0 && (
        <div className="select-holder">
          <select
            name={familyId !== undefined ? `fatherId-${familyId}` : 'fatherId'}
            onChange={handleChange}
            value={fatherId}
          >
            <option value="" disabled>{ t('option-father') }</option>
            {fatherIdOptions}
          </select>
        </div>
        )}
        {motherIdOptions.length === 0 && fatherIdOptions.length === 0 && (
        <p>* { t('notice-add-family') }</p>
        )}
      </div>
    </div>
  );
}

/**
 * props
 * @param {array} family data structure for family entries
 * @param {number} id number representing the position witin the family data structure
 * @param {function} handleChange updates parent state
 */
MotherFatherIds.propTypes = {
  family: PropTypes.instanceOf(Array).isRequired,
  familyId: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
};

MotherFatherIds.defaultProps = {
  familyId: undefined,
};

export default MotherFatherIds;
