import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import CancerEntries from '../cancerEntries';
import Gender from '../gender';
import MotherFatherIds from '../motherFatherIds';
import Relationship from '../relationship';

/**
 * Family entry with numeric counter and removal button
 */
function FamilyEntry(props) {
  const { addCancerDiagnosis, family, handleChange, person, removeEntry } = props;
  const { t } = useTranslation();
  const ageOptions = [];

  for (let a = 0; a <= 120; a += 1)
    ageOptions.push(<option key={shortid.generate()} value={a}>{a}</option>);

  const familyId = family.findIndex((p) => p.id === person.id);

  return (
    <div className="family">
      <div className="familyHeader">
        <h2>{ t('h2-family-member') } #{familyId + 1}</h2>
        <button
          onClick={() => removeEntry('family', familyId)}
          type="button"
        >
          x
        </button>
      </div>

      <div className="content">
        <h2 className="block">{ t('h2-name') }</h2>
        <input
          aria-label="Name"
          aria-required="true"
          id="nameInput"
          name={`name-${familyId}`}
          onChange={handleChange}
          placeholder={t('placeholder-fullName')}
          type="text"
          value={person.name}
        />
        <br />
        <h2 className="block">{ t('h2-age') }</h2>
        <div className="select-holder">
          <select
            name={`age-${familyId}`}
            onChange={handleChange}
            value={person.age}
          >
            <option value="" disabled>{ t('option-select-age') }</option>
            {ageOptions}
          </select>
        </div>

        <MotherFatherIds
          fatherId={person.fatherId}
          motherId={person.motherId}
          family={family}
          familyId={familyId}
          handleChange={handleChange}
        />

        <Gender
          familyId={familyId}
          handleChange={handleChange}
        />

        <Relationship
          familyId={familyId}
          person={person}
          handleChange={handleChange}
        />

        <CancerEntries
          addCancerDiagnosis={addCancerDiagnosis}
          cancers={family[familyId].cancers}
          familyId={familyId}
          handleChange={handleChange}
          removeEntry={removeEntry}
        />
      </div>
    </div>
  );
}

/**
 * props
 * @param {function} addCancerDiagnosis adds a new entry to cancers data structure
 * @param {array} family data structure for family entries
 * @param {function} handleChange updates parent state
 * @param {object} person family member
 * @param {function} removeEntry removes an entry from data structure
 */
FamilyEntry.propTypes = {
  addCancerDiagnosis: PropTypes.func.isRequired,
  family: PropTypes.instanceOf(Array).isRequired,
  handleChange: PropTypes.func.isRequired,
  person: PropTypes.instanceOf(Object).isRequired,
  removeEntry: PropTypes.func.isRequired,
};

export default FamilyEntry;
