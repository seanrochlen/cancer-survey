import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CancerEntry from '../cancerEntry';

/**
 * Setup for displaying all cancers
 */
function CancerEntries(props) {
  const { addCancerDiagnosis, cancers, familyId, handleChange, removeEntry } = props;
  const { t } = useTranslation();

  const allCancersEntries = cancers.map((cancer, index) => {
    return (
      <CancerEntry
        key={cancer.id}
        cancer={cancer}
        cancerId={index}
        familyId={familyId}
        handleChange={handleChange}
        removeEntry={removeEntry}
      />
    );
  });

  return (
    <div className="row">
      <h2>{ t('h2-cancer-diagnoses') }</h2>
      <button
        className="add-button"
        onClick={() => addCancerDiagnosis(familyId)}
        type="button"
      >
        <span>(</span>
        <span className="cancers-addNewDiagnosis">{ t('span-add-new-diagnosis') }</span>
        <span>)</span>
      </button>

      {allCancersEntries.length > 0 && (
      <div className="cancerEntries">
        <h3 className="firstHeading">{ t('h3-cancer-type') }</h3>
        <h3>{ t('h3-age-diagnosed') }</h3>
        {allCancersEntries}
      </div>
      )}
    </div>
  );
}

/**
 * props
 * @param {function} addCancerDiagnosis adds a new entry to cancers data structure
 * @param {array} cancers data structure for cancer entries
 * @param {number} familyId determines if within family and which member position within family data structure
 * @param {function} handleChange updates parent state
 * @param {function} removeEntry removes an entry from data structure
 */
CancerEntries.propTypes = {
  addCancerDiagnosis: PropTypes.func.isRequired,
  cancers: PropTypes.instanceOf(Array).isRequired,
  familyId: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
};

CancerEntries.defaultProps = {
  familyId: undefined,
};

export default CancerEntries;
