import React from 'react';
import { mount } from 'enzyme';
import CancerEntries from '../components/cancerEntries';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}));

const props = {
  addCancerDiagnosis: jest.fn(),
  cancers: [],
  familyId: undefined,
  handleChange: jest.fn(),
  removeEntry: jest.fn()
};
let wrapper;

describe('<CancerEntries>', () => {
  beforeEach(() => {
    wrapper = mount(<CancerEntries {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {
    test('Click - Button - addCancerDiagnosis', () => {
      wrapper.find('button').simulate('click');
      expect(wrapper.props().addCancerDiagnosis.mock.calls.length).toBe(1);
    });
  });
  describe('Rendering', () => {
    test('no render of .cancerEntries if no entries in cancers', () => {
      expect(wrapper.find('.cancerEntries').exists()).toBe(false);
    });
    test('render .cancerEntries if entries in cancers', () => {
      wrapper.setProps({ cancers: [{ id: 123245, cancerType: '', ageOfDiagnosis: '' }] });
      expect(wrapper.find('.cancerEntries').exists()).toBe(true);
    });
  });
});
