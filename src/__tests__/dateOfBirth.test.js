import React from 'react';
import { mount } from 'enzyme';
import DateOfBirth from '../components/dateOfBirth';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}));

const props = {
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  handleChange: jest.fn()
};
let wrapper;

describe('<DateOfBirth>', () => {
  beforeEach(() => {
    wrapper = mount(<DateOfBirth {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {

  });
  describe('Rendering', () => {
    test('', () => {

    });
  });
});
