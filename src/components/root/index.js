import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import CancerEntries from '../cancerEntries';
import ChangeLanguage from '../changeLanguage';
import DateOfBirth from '../dateOfBirth';
import FamilyEntries from '../familyEntries';
import Footer from '../footer';
import Gender from '../gender';
import MotherFatherIds from '../motherFatherIds';
import Name from '../name';

/**
 * Sets up the Single Page Application's Main Form
 */
export class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 'patient0',
      firstName: '',
      lastName: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      gender: '',
      cancers: [],
      family: [],
      motherId: '',
      fatherId: '',
      disabled: false,
    };

    this.addCancerDiagnosis = this.addCancerDiagnosis.bind(this);
    this.addFamilyMember = this.addFamilyMember.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  /**
   * Adds a cancer entry in either the cancers data structure or family cancers data structure
   * @param {number} familyId position in family data structure
   */
  addCancerDiagnosis(familyId) {
    const { cancers, family } = this.state;
    const newCancerRow = { id: shortid.generate(), cancerType: '', ageOfDiagnosis: '' };

    // if a family id is passed then push to the family cancers array, else push to cancers array
    if (familyId !== undefined) {
      family[familyId].cancers.push(newCancerRow);

      this.setState({ family });
    }
    else {
      cancers.push(newCancerRow);

      this.setState({ cancers });
    }
  }

  /**
   * Adds a new entry to family
   */
  addFamilyMember() {
    const { family } = this.state;

    family.push({ id: shortid.generate(), name: '', age: '', motherId: '', fatherId: '', gender: '', relationship: '', cancers: [] });

    this.setState({ family });
  }

  /**
   * Handles state changes
   * @param {object} e event
   */
  handleChange(e) {
    const { cancers, gender, family, id, fatherId, motherId } = this.state;
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const splitName = target.name.split('-');
    let changedStates;

    // patient
    if (splitName.length === 1) {
      changedStates = {
        [target.name]: value,
      };

      if (target.name === 'motherId' || target.name === 'fatherId') {
        // check if there is a mother or father relationship established on the family member or we need to apply it based on the user selection
        if (!family.some((member) => member.relationship === target.name)) {
          const familyMemberIndex = family.findIndex((p) => p.name === value);
          family[familyMemberIndex].relationship = target.name === 'motherId' ? 'mother' : 'father';
          changedStates.family = family;
        }
      }

      this.setState({ ...changedStates });
    }

    // cancers or family
    if (splitName.length === 2) {
      //  if changing cancers or family
      if (splitName[0] === 'cancerType' || splitName[0] === 'ageOfDiagnosis') {
        cancers[splitName[1]][splitName[0]] = value;
        this.setState({ cancers });
      }
      else {
        family[splitName[1]][splitName[0]] = value;
        changedStates = {
          family,
        };
        // update motherId or fatherId if relationship matches
        if (splitName[0] === 'relationship' && value === 'father')
          changedStates.fatherId = family[splitName[1]].id;
        if (splitName[0] === 'relationship' && value === 'mother')
          changedStates.motherId = family[splitName[1]].id;
        if (splitName[0] === 'relationship' && (value === 'son' || value === 'daughter') && gender === 'male')
          changedStates.family[splitName[1]].fatherId = id;
        if (splitName[0] === 'relationship' && (value === 'son' || value === 'daughter') && gender === 'female')
          changedStates.family[splitName[1]].motherId = id;
        if (splitName[0] === 'relationship' && (value === 'brother' || value === 'sister')) {
          fatherId && (changedStates.family[splitName[1]].fatherId = fatherId);
          motherId && (changedStates.family[splitName[1]].motherId = motherId);
        }
        if (splitName[0] === 'relationship' && ((value === 'maternal half brother') || (value === 'maternal half sister')))
          motherId && (changedStates.family[splitName[1]].motherId = motherId);
        if (splitName[0] === 'relationship' && ((value === 'paternal half brother') || (value === 'paternal half sister')))
          fatherId && (changedStates.family[splitName[1]].fatherId = fatherId);
        this.setState({ ...changedStates });
      }
    }

    // family cancers
    if (splitName.length === 3) {
      family[splitName[2]].cancers[splitName[1]][splitName[0]] = value;

      this.setState({ family });
    }
  }

  /**
   * Removes an entry from data structures cancer or family or family cancers
   * @param {string} field determines where to set data
   * @param {number} index position in data structure cancers or family
   * @param {number} familyId position in data structure family
   */
  removeEntry(field, index, familyId) {
    const { cancers, family } = this.state;

    if (field === 'cancers') {
      if (familyId !== undefined) {
        family[familyId].cancers.splice(index, 1);
        this.setState({ family });
      }
      else {
        cancers.splice(index, 1);
        this.setState({ cancers });
      }
    }
    else {
      family.splice(index, 1);
      this.setState({ family });
    }
  }

  /**
   * Handles submitting the form
   * @param {object} e event
   */
  submitData(e) {
    e.preventDefault();
    const { id, firstName, lastName, birthDay, birthMonth, birthYear, gender, cancers, family } = this.state;
    let { fatherId, motherId } = this.state;
    const endpoint = '';
    const dateOfBirth = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;

    if (motherId === '')
      motherId = null;
    if (fatherId === '')
      fatherId = null;

    // before submission we need to adjust the values of numbers saved and remove the unnecessary ids in cancers
    for (let i = 0; i < cancers.length; i += 1) {
      delete cancers[i].id;
      cancers[i].ageOfDiagnosis = cancers[i].ageOfDiagnosis.padStart(2, '0');
    }

    for (let i = 0; i < family.length; i += 1) {
      family[i].id = family[i].name;
      delete family[i].name;
      family[i].age = family[i].age.padStart(2, '0');

      if (family[i].motherId === '')
        motherId = null;
      if (family[i].fatherId === '')
        fatherId = null;

      for (let j = 0; j < family[i].cancers.length; j += 1) {
        delete family[i].cancers[j].id;
        family[i].cancers[j].ageOfDiagnosis = family[i].cancers[j].ageOfDiagnosis.padStart(2, '0');
      }
    }

    // validation goes here with UI interacting
    // 1. gender - required
    // 2. birthDay, birthMonth, birthYear - must have all 3 if one is entered and not required for entry of birthdate
    // 3. cancers - cancer type required
    // 4. family - cancers same requirement as cancers
    // 5. family - id - this is used as the name and is required
    // 6. family - gender same requirement as gender
    // 7. family - relationship - required
    // 8. Matching relationship to mother / father id

    const payload = {
      id,
      motherId,
      fatherId,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      cancers,
      family,
    };

    // submission would go here with the endpoint specified and payload (tbd) - moved to redux action/reducer
    try {
      axios.post(endpoint, payload)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    catch (err) {
      console.log(err);
    }

    console.log('payload: ', payload);

    this.setState({ disabled: true });
  }

  render() {
    const { birthDay, birthMonth, birthYear, firstName, lastName, cancers, family, fatherId, motherId, disabled } = this.state;
    const { t } = this.props;

    return (
      <main role="main" className={disabled ? 'disabled' : ''}>
        <ChangeLanguage />

        <header>
          <h1>{ t('h1-project-title') }</h1>
        </header>

        <form onSubmit={this.submitData}>
          <Name
            firstName={firstName}
            lastName={lastName}
            handleChange={this.handleChange}
          />

          <DateOfBirth
            birthDay={birthDay}
            birthMonth={birthMonth}
            birthYear={birthYear}
            handleChange={this.handleChange}
          />

          <Gender handleChange={this.handleChange} />

          <MotherFatherIds
            fatherId={fatherId}
            motherId={motherId}
            family={family}
            handleChange={this.handleChange}
          />

          <CancerEntries
            addCancerDiagnosis={this.addCancerDiagnosis}
            cancers={cancers}
            handleChange={this.handleChange}
            removeEntry={this.removeEntry}
          />

          <FamilyEntries
            addCancerDiagnosis={this.addCancerDiagnosis}
            addFamilyMember={this.addFamilyMember}
            family={family}
            handleChange={this.handleChange}
            removeEntry={this.removeEntry}
          />
          <input type="submit" value={t('input-submit')} />
        </form>

        {disabled && <p className="submission-text">Thank you for submitting! We&apos;ll be in touch shortly.</p>}

        <Footer />

        {disabled && <div className="modal" />}
      </main>
    );
  }
}

/**
 * props
 * @param {function} t language translation
 */
Root.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('translation')(Root);
