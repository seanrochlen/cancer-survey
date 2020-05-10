import axios from 'axios';

export const submitFormData = (payload) => {
  return (dispatch) => {
    const { id, firstName, lastName, birthDay, birthMonth, birthYear, gender, cancers, family } = payload;
    let { fatherId, motherId } = payload;
    const endpoint = 'http://localhost:3000/test';
    const dateOfBirth = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;

    if (motherId === '')
      motherId = null;
    if (fatherId === '')
      fatherId = null;

    // before submission we need to adjust the values of numbers saved and remove the unnecessary ids in cancers
    for (let i = 0; i < cancers.length; i += 1) {
      // delete cancers[i].id;
      if (cancers[i].ageOfDiagnosis)
        cancers[i].ageOfDiagnosis = cancers[i].ageOfDiagnosis.padStart(2, '0');
    }

    // find relationships for father and mother and set patient's fatherId and motherId
    const fatherIdIndex = family.findIndex((member) => member.relationship === 'father');
    if (fatherIdIndex !== -1)
      fatherId = family[fatherIdIndex].id;
    const motherIdIndex = family.findIndex((member) => member.relationship === 'mother');
    if (motherIdIndex !== -1)
      motherId = family[motherIdIndex].id;

    for (let i = 0; i < family.length; i += 1) {
      const { relationship } = family[i];

      // set all family members motherId / fatherId based on relationship
      if ((relationship === 'son' || relationship === 'daughter') && gender === 'male')
        family[i].fatherId = id;
      if ((relationship === 'son' || relationship === 'daughter') && gender === 'female')
        family[i].motherId = id;
      if (relationship === 'brother' || relationship === 'sister') {
        fatherId && (family[i].fatherId = fatherId);
        motherId && (family[i].motherId = motherId);
      }
      if ((relationship === 'maternal half brother') || (relationship === 'maternal half sister'))
        family[i].motherId = motherId;
      if ((relationship === 'paternal half brother') || (relationship === 'paternal half sister'))
        family[i].fatherId = fatherId;
      if ((relationship === 'maternal uncle') || (relationship === 'maternal aunt')) {
        const maternalGrandMotherIndex = family.findIndex((member) => member.relationship === 'maternal grandmother');
        maternalGrandMotherIndex !== -1 && (family[i].motherId = family[maternalGrandMotherIndex].id);
        const maternalGrandFatherIndex = family.findIndex((member) => member.relationship === 'maternal grandfather');
        maternalGrandFatherIndex !== -1 && (family[i].fatherId = family[maternalGrandFatherIndex].id);
      }
      if ((relationship === 'paternal uncle') || (relationship === 'paternal aunt')) {
        const paternalGrandMotherIndex = family.findIndex((member) => member.relationship === 'paternal grandmother');
        paternalGrandMotherIndex !== -1 && (family[i].motherId = family[paternalGrandMotherIndex].id);
        const paternalGrandFatherIndex = family.findIndex((member) => member.relationship === 'paternal grandfather');
        paternalGrandFatherIndex !== -1 && (family[i].fatherId = family[paternalGrandFatherIndex].id);
      }
      if (family[i].age)
        family[i].age = family[i].age.padStart(2, '0');

      if (family[i].motherId === '')
        motherId = null;
      if (family[i].fatherId === '')
        fatherId = null;

      for (let j = 0; j < family[i].cancers.length; j += 1) {
        // delete family[i].cancers[j].id;
        if (family[i].cancers[j].ageOfDiagnosis)
          family[i].cancers[j].ageOfDiagnosis = family[i].cancers[j].ageOfDiagnosis.padStart(2, '0');
      }
    }

    // for (let p = 0; p < family.length; p += 1) {
    //   family[p].id = family[p].name;
    //   delete family[p].name;
    // }

    const payloadForSubmission = {
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

    try {
      axios.post(endpoint, payloadForSubmission)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res.data);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    // eslint-disable-next-line no-console
    console.log('payload: ', payload);

    dispatch({ type: 'SUBMIT_FORM_DATA', payload: payload });
  };
};
