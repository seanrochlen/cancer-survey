import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * Selections for mother and father
 * NOTE: More checks needed for family members relationship parentid matching
 */
function MotherFatherIds(props) {
  const { fatherId, motherId, family, familyId, handleChange } = props;
  const { t } = useTranslation();

  // filters the family by specified gender
  const filterFamilyByGender = (gender) => {
    return family.filter((person) => {
      // inside family
      if (familyId !== undefined)
        return person.gender === gender && person.id !== family[familyId].id && person.name !== '';
      // not inside family
      if (((gender === 'female' && motherId !== '') || (gender === 'male' && fatherId !== '')) && person.name !== '')
        return person.id;
      return person.gender === gender && person.name !== '';
    });
  };

  // filter family by gender to create selection options for fatherId motherId
  const familyFilteredByFemales = filterFamilyByGender('female');
  const familyFilteredByMales = filterFamilyByGender('male');

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
 * @param {number} fatherId id number representing person's father
 * @param {number} motherId id number representing person's mother
 * @param {array} family data structure for family entries
 * @param {number} id number representing the position witin the family data structure
 * @param {function} handleChange updates parent state
 */
MotherFatherIds.propTypes = {
  fatherId: PropTypes.string.isRequired,
  motherId: PropTypes.string.isRequired,
  family: PropTypes.instanceOf(Array).isRequired,
  familyId: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
};

MotherFatherIds.defaultProps = {
  familyId: undefined,
};

export default MotherFatherIds;
