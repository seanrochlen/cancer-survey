import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import shortid from 'shortid';

/**
 * Selection for relationship
 */
function Relationship(props) {
  const { familyId, handleChange, person } = props;
  const { t } = useTranslation();
  const ageOptions = [];

  for (let a = 0; a <= 120; a += 1)
    ageOptions.push(<option key={shortid.generate()} value={a}>{a}</option>);

  const relationshipData = [
    { value: 'brother', text: t('option-brother') },
    { value: 'daughter', text: t('option-daughter') },
    { value: 'father', text: t('option-father') },
    { value: 'granddaughter', text: t('option-granddaughter') },
    { value: 'grandson', text: t('option-grandson') },
    { value: 'maternal aunt', text: t('option-maternal-aunt') },
    { value: 'maternal first cousin', text: t('option-maternal-first-cousin') },
    { value: 'maternal grandfather', text: t('option-maternal-grandfather') },
    { value: 'maternal grandmother', text: t('option-maternal-grandmother') },
    { value: 'maternal half brother', text: t('option-maternal-half-brother') },
    { value: 'maternal half sister', text: t('option-maternal-half-sister') },
    { value: 'maternal uncle', text: t('option-maternal-uncle') },
    { value: 'mother', text: t('option-mother') },
    { value: 'other', text: t('option-other') },
    { value: 'paternal aunt', text: t('option-paternal-aunt') },
    { value: 'paternal half cousin', text: t('option-paternal-first-cousin') },
    { value: 'paternal grandfather', text: t('option-paternal-grandfather') },
    { value: 'paternal grandmother', text: t('option-paternal-grandmother') },
    { value: 'paternal half brother', text: t('option-paternal-half-brother') },
    { value: 'paternal half sister', text: t('option-paternal-half-sister') },
    { value: 'paternal uncle', text: t('option-paternal-uncle') },
    { value: 'sister', text: t('option-sister') },
    { value: 'son', text: t('option-son') },
  ];

  const relationshipsSorted = relationshipData.sort((a, b) => {
    if (a.text < b.text)
      return -1;
    if (a.text > b.text)
      return 1;
    return 0;
  });

  const relationshipOptions = relationshipsSorted.map((relationship) => <option key={shortid.generate()} value={relationship.value}>{relationship.text}</option>);

  return (
    <>
      <h2 className="block">{ t('h2-relationship') }</h2>
      <div className="select-holder">
        <select
          name={`relationship-${familyId}`}
          onChange={handleChange}
          value={person.relationship}
        >
          <option value="" disabled>{ t('option-select-relationship') }</option>
          {relationshipOptions}
        </select>
      </div>
    </>
  );
}

/**
 * props
 * @param {number} familyId number representing the position witin the family data structure
 * @param {function} handleChange updates parent state
 * @param {object} person family member
 */
Relationship.propTypes = {
  familyId: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  person: PropTypes.instanceOf(Object).isRequired,
};

export default Relationship;
