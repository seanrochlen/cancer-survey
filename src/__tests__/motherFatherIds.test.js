import React from 'react';
import { mount } from 'enzyme';
import MotherFatherIds from '../components/motherFatherIds';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const props = {
  fatherId: '',
  motherId: '',
  family: [],
  familyId: undefined,
  handleChange: jest.fn(),
};
let wrapper;
const familyOneMale = { family: [{ id: '12345', name: 'john', age: '', motherId: '', fatherId: '', gender: 'male', relationship: '', cancers: [] }] };
const familyOneFemale = { family: [{ id: '12346', name: 'cindy', age: '', motherId: '', fatherId: '', gender: 'female', relationship: '', cancers: [] }] };
const familyTwoMales = {
  family: [
    { id: '12345', name: 'john', age: '', motherId: '', fatherId: '', gender: 'male', relationship: '', cancers: [] },
    { id: '123456', name: 'alex', age: '', motherId: '', fatherId: '', gender: 'male', relationship: '', cancers: [] },
  ],
};
const familyTwoFemales = {
  family: [
    { id: '12345', name: 'cindy', age: '', motherId: '', fatherId: '', gender: 'female', relationship: '', cancers: [] },
    { id: '123456', name: 'nancy', age: '', motherId: '', fatherId: '', gender: 'female', relationship: '', cancers: [] },
  ],
};
const familyOneMaleOneFemale = {
  family: [
    { id: '12345', name: 'john', age: '', motherId: '', fatherId: '', gender: 'male', relationship: '', cancers: [] },
    { id: '123456', name: 'cindy', age: '', motherId: '', fatherId: '', gender: 'female', relationship: '', cancers: [] },
  ],
};

describe('<MotherFatherIds>', () => {
  beforeEach(() => {
    /* eslint-disable react/jsx-props-no-spreading */
    wrapper = mount(<MotherFatherIds {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {
    test('Change - Select fatherId - handleChange', () => {
      wrapper.setProps(familyOneMale);
      wrapper.find('select').simulate('change', { target: { value: '12345' } });
      expect(wrapper.props().handleChange.mock.calls.length).toBe(1);
    });
    test('Change - Select motherId - handleChange', () => {
      wrapper.setProps(familyOneFemale);
      wrapper.find('select').simulate('change', { target: { value: '12345' } });
      expect(wrapper.props().handleChange.mock.calls.length).toBe(2);
    });
  });
  describe('Rendering', () => {
    test('p notice-add-family displays when no motherId or fatherId options for user to select', () => {
      expect(wrapper.find('p').exists()).toBe(true);
    });
    test('p notice-add-family does not display when there is a motherId option but no fatherId options', () => {
      wrapper.setProps(familyOneFemale);
      expect(wrapper.find('p').exists()).toBe(false);
    });
    test('p notice-add-family does not display when there is a fatherId option but no motherId options', () => {
      wrapper.setProps(familyOneMale);
      expect(wrapper.find('p').exists()).toBe(false);
    });
    test('p notice-add-family does not display when there are fatherId options and motherId options', () => {
      wrapper.setProps(familyOneMaleOneFemale);
      expect(wrapper.find('p').exists()).toBe(false);
    });
    test('select fatherId name no familyId fatherId', () => {
      wrapper.setProps(familyOneMale);
      expect(wrapper.find('select').props().name).toBe('fatherId');
    });
    test('select fatherId name familyId provided fatherId-$(familyId)', () => {
      wrapper.setProps({ familyId: 1 });
      wrapper.setProps(familyTwoMales);
      expect(wrapper.find('select').props().name).toBe('fatherId-1');
    });
    test('select motherId name no familyId motherId', () => {
      wrapper.setProps(familyOneMale);
      expect(wrapper.find('select').props().name).toBe('fatherId');
    });
    test('select motherId name familyId provided motherId-$(familyId)', () => {
      wrapper.setProps({ familyId: 1 });
      wrapper.setProps(familyTwoFemales);
      expect(wrapper.find('select').props().name).toBe('motherId-1');
    });
    test('select fatherId displays when fatherId options are available', () => {
      wrapper.setProps(familyOneMale);
      expect(wrapper.find('select[name="fatherId"]').exists()).toBe(true);
    });
    test('select motherId displays when motherId options are available', () => {
      wrapper.setProps(familyOneFemale);
      expect(wrapper.find('select[name="motherId"]').exists()).toBe(true);
    });
    test('select fatherId value is fatherId', () => {
      wrapper.setProps({ fatherId: '12345' });
      wrapper.setProps(familyOneMale);
      expect(wrapper.find('select[name="fatherId"]').props().value).toBe('12345');
    });
    test('select motherId value is motherId', () => {
      wrapper.setProps({ motherId: '12345' });
      wrapper.setProps(familyOneFemale);
      expect(wrapper.find('select[name="motherId"]').props().value).toBe('12345');
    });
  });
});
