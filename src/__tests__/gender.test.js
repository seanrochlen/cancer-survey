import React from 'react';
import { mount } from 'enzyme';
import Gender from '../components/gender';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const props = {
  familyId: undefined,
  handleChange: jest.fn(),
};
let wrapper;

describe('<Gender>', () => {
  beforeEach(() => {
    /* eslint-disable react/jsx-props-no-spreading */
    wrapper = mount(<Gender {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {
    test('Change - Input genderMale - handleChange', () => {
      wrapper.find('#gender-male').simulate('change', { target: { value: 'male' } });
      expect(wrapper.props().handleChange.mock.calls.length).toBe(1);
    });
    test('Change - Input genderFemale - handleChange', () => {
      wrapper.find('#gender-female').simulate('change', { target: { value: 'female' } });
      expect(wrapper.props().handleChange.mock.calls.length).toBe(2);
    });
  });
  describe('Rendering', () => {
    test('Inputs name no familyId provided is gender', () => {
      expect(wrapper.find('#gender-female').props().name).toBe('gender');
      expect(wrapper.find('#gender-male').props().name).toBe('gender');
    });
    test('Input genderFemale id no familyId provided is gender-female', () => {
      expect(wrapper.find('#gender-female').exists()).toBe(true);
    });
    test('Input genderMale id no familyId provided is gender-male', () => {
      expect(wrapper.find('#gender-male').exists()).toBe(true);
    });
    test('Inputs name familyId provided is gender-familyId', () => {
      wrapper.setProps({ familyId: 1 });
      expect(wrapper.find('#gender-male-1').props().name).toBe('gender-1');
      expect(wrapper.find('#gender-female-1').props().name).toBe('gender-1');
    });
    test('Input genderMale id familyId provided is gender-male-familyId', () => {
      wrapper.setProps({ familyId: 1 });
      expect(wrapper.find('#gender-male-1').exists()).toBe(true);
    });
    test('Input genderFemale id familyId provided is gender-female-familyId', () => {
      wrapper.setProps({ familyId: 1 });
      expect(wrapper.find('#gender-female-1').exists()).toBe(true);
    });
    test('Input genderMale value male', () => {
      expect(wrapper.find('#gender-male').props().value).toBe('male');
    });
    test('Input genderFemale value female', () => {
      expect(wrapper.find('#gender-female').props().value).toBe('female');
    });
  });
});
