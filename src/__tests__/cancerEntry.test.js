import React from 'react';
import { mount } from 'enzyme';
import CancerEntry from '../components/cancerEntry';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const props = {
  cancer: { ageOfDiagnosis: 1, cancerType: 'brain' },
  cancerId: 0,
  familyId: undefined,
  handleChange: jest.fn(),
  removeEntry: jest.fn(),
};
let wrapper;

describe('<CancerEntry>', () => {
  beforeEach(() => {
    /* eslint-disable react/jsx-props-no-spreading */
    wrapper = mount(<CancerEntry {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {
    test('Click - Button - removeEntry', () => {
      wrapper.find('button').simulate('click');
      expect(wrapper.props().removeEntry.mock.calls.length).toBe(1);
    });
    test('Change - Select CancerType - handleChange', () => {
      wrapper.find('select').first().simulate('change', { target: { value: 'breast' } });
      expect(wrapper.props().handleChange.mock.calls.length).toBe(1);
    });
    test('Change - Select AgeOfDiagnosis - handleChange', () => {
      wrapper.find('select').at(1).simulate('change', { target: { value: '1' } });
      expect(wrapper.props().handleChange.mock.calls.length).toBe(2);
    });
  });
  describe('Rendering', () => {
    test('select cancerType name no familyId cancerType-cancerId', () => {
      expect(wrapper.find('select').first().props().name).toBe('cancerType-0');
    });
    test('select cancerType name familyId provided cancerType-cancerId-familyId', () => {
      wrapper.setProps({ familyId: 1 });
      expect(wrapper.find('select').first().props().name).toBe('cancerType-0-1');
    });
    test('select cancerType value cancer.cancerType', () => {
      expect(wrapper.find('select').first().props().value).toBe('brain');
    });
    test('select ageOfDiagnosis name no familyId ageOfDiagnosis-cancerId', () => {
      expect(wrapper.find('select').at(1).props().name).toBe('ageOfDiagnosis-0');
    });
    test('select ageOfDiagnosis name familyId provided ageOfDiagnosis-cancerId-familyId', () => {
      wrapper.setProps({ familyId: 1 });
      expect(wrapper.find('select').at(1).props().name).toBe('ageOfDiagnosis-0-1');
    });
    test('select ageOfDiagnosis value cancer.ageOfDiagnosis', () => {
      expect(wrapper.find('select').at(1).props().value).toBe(1);
    });
  });
});
