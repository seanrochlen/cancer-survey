import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import shortid from 'shortid';

/**
 * Cancer entry including select for type, age and a removal button
 */
function CancerEntry(props) {
  const { cancer, cancerId, familyId, handleChange, removeEntry } = props;
  const { t } = useTranslation();
  const cancerAgeOptions = [];

  for (let a = 0; a <= 120; a += 1)
    cancerAgeOptions.push(<option key={shortid.generate()} value={a}>{a}</option>);

  const cancersData = [
    { value: 'brain', text: t('option-cancer-type-brain') },
    { value: 'breast', text: t('option-cancer-type-breast') },
    { value: 'colorectal', text: t('option-cancer-type-colorectal') },
    { value: 'endometrial', text: t('option-cancer-type-endometrial') },
    { value: 'gastric', text: t('option-cancer-type-gastric') },
    { value: 'kidney', text: t('option-cancer-type-kidney') },
  ];

  const cancersSorted = cancersData.sort((a, b) => {
    if (a.text < b.text)
      return -1;
    if (a.text > b.text)
      return 1;
    return 0;
  });

  const cancerOptions = cancersSorted.map((cancer) => <option key={shortid.generate()} value={cancer.value}>{cancer.text}</option>);

  return (
    <div className="row">
      <div className="select-holder">
        <select
          name={familyId !== undefined ? `cancerType-${cancerId}-${familyId}` : `cancerType-${cancerId}`}
          onChange={handleChange}
          value={cancer.cancerType}
        >
          <option value="" disabled>{ t('option-select-cancer-type') }</option>
          {cancerOptions}
        </select>
      </div>

      <div className="select-holder">
        <select
          name={familyId !== undefined ? `ageOfDiagnosis-${cancerId}-${familyId}` : `ageOfDiagnosis-${cancerId}`}
          onChange={handleChange}
          value={cancer.ageOfDiagnosis}
        >
          <option value="" disabled>{ t('option-select-age')}</option>
          {cancerAgeOptions}
        </select>
      </div>

      <button
        type="button"
        onClick={() => removeEntry('cancers', cancerId, familyId)}
      >
        x
      </button>
    </div>
  );
}

/**
 * props
 * @param {object} cancer cancer object
 * @param {number} cancerId cancers index referenced
 * @param {number} familyId determines if within family and which member position within family data structure
 * @param {function} handleChange updates parent state
 * @param {function} removeEntry removes an entry from data structure
 */
CancerEntry.propTypes = {
  cancer: PropTypes.instanceOf(Object).isRequired,
  cancerId: PropTypes.number.isRequired,
  familyId: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
};

CancerEntry.defaultProps = {
  familyId: undefined,
};

export default CancerEntry;
