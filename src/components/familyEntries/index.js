import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import FamilyEntry from '../familyEntry';

/**
 * Setup for displaying all the families
 */
function FamilyEntries(props) {
  const { addCancerDiagnosis, addFamilyMember, family, handleChange, removeEntry } = props;
  const { t } = useTranslation();

  const allFamilyEntries = family.map((person) => {
    return (
      <FamilyEntry
        key={person.id}
        addCancerDiagnosis={addCancerDiagnosis}
        family={family}
        handleChange={handleChange}
        person={person}
        removeEntry={removeEntry}
      />
    );
  });

  return (
    <>
      <h2>{ t('h2-family-members') }</h2>
      <button
        className="add-button"
        onClick={addFamilyMember}
        type="button"
      >
        <span>(</span>
        <span>{ t('span-add-new-family-member') }</span>
        <span>)</span>
      </button>

      {allFamilyEntries.length > 0 && (
      <div className="familyEntries">
        {allFamilyEntries}
      </div>
      )}
    </>
  );
}


/**
 * props
 * @param {function} addCancerDiagnosis adds a new entry to cancers data structure
 * @param {function} addFamilyMember adds a new entry to family data structure
 * @param {array} family data structure for family entries
 * @param {function} handleChange updates parent state
 * @param {function} removeEntry removes an entry from data structure
 */
FamilyEntries.propTypes = {
  addCancerDiagnosis: PropTypes.func.isRequired,
  addFamilyMember: PropTypes.func.isRequired,
  family: PropTypes.instanceOf(Array).isRequired,
  handleChange: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
};

export default FamilyEntries;
