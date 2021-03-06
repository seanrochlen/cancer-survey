import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { submitFormData } from '../../redux';
import CancerEntries from '../cancerEntries';
import ChangeLanguage from '../changeLanguage';
import DateOfBirth from '../dateOfBirth';
import FamilyEntries from '../familyEntries';
import Footer from '../footer';
import Gender from '../gender';
// import MotherFatherIds from '../motherFatherIds';
import Name from '../name';

/**
 * Sets up the Single Page Application's Main Form
 */
export class Root extends Component {
  constructor(props) {
    super(props);
    const { patientId } = props;

    this.state = {
      id: patientId,
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
    const { cancers, family } = this.state;
    const { target } = e;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const splitName = target.name.split('-');

    // patient
    if (splitName.length === 1)
      this.setState({ [target.name]: value });

    // cancers or family
    if (splitName.length === 2) {
      //  if changing cancers or family
      if (splitName[0] === 'cancerType' || splitName[0] === 'ageOfDiagnosis') {
        cancers[splitName[1]][splitName[0]] = value;
        this.setState({ cancers });
      }
      else {
        family[splitName[1]][splitName[0]] = value;
        this.setState({ family });
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
    const { submitFormData } = this.props;

    // validation goes here with UI interacting
    // 1. gender - required
    // 2. birthDay, birthMonth, birthYear - must have all 3 if one is entered and not required for entry of birthdate
    // 3. cancers - cancer type required
    // 4. family - cancers same requirement as cancers
    // 5. family - id - this is used as the name and is required
    // 6. family - gender same requirement as gender
    // 7. family - relationship - required

    submitFormData(this.state);

    this.setState({ disabled: true });
  }

  render() {
    const { birthDay, birthMonth, birthYear, firstName, lastName, cancers, family, disabled } = this.state;
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

          {/* <MotherFatherIds
            fatherId={fatherId}
            motherId={motherId}
            family={family}
            handleChange={this.handleChange}
          /> */}

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

function bindAction(dispatch) {
  return {
    submitFormData: (data) => dispatch(submitFormData(data)),
  };
}

/**
 * props
 * @param {number} patientId specified id of the patient
 * @param {function} submitFormData form action for submitting data
 * @param {function} t language translation
 */
Root.propTypes = {
  patientId: PropTypes.string.isRequired,
  submitFormData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default connect(null, bindAction)(withTranslation('translation')(Root));
