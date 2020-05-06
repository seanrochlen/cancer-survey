import React from 'react';
import { mount } from 'enzyme';
import FamilyEntries from '../components/familyEntries';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const props = {
  addCancerDiagnosis: jest.fn(),
  addFamilyMember: jest.fn(),
  family: [],
  handleChange: jest.fn(),
  removeEntry: jest.fn(),
};
let wrapper;

describe('<FamilyEntries>', () => {
  beforeEach(() => {
    /* eslint-disable react/jsx-props-no-spreading */
    wrapper = mount(<FamilyEntries {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {
    test('Click - Button - addFamilyMember', () => {
      wrapper.find('button').simulate('click');
      expect(wrapper.props().addFamilyMember.mock.calls.length).toBe(1);
    });
  });
  describe('Rendering', () => {
    test('no render of .familyEntries if no entries in cancers', () => {
      expect(wrapper.find('.familyEntries').exists()).toBe(false);
    });
    test('render .familyEntries if entries in family', () => {
      wrapper.setProps({ family: [{ id: 12345, name: '', age: '', motherId: null, fatherId: null, gender: '', relationship: '', cancers: [] }] });
      expect(wrapper.find('.familyEntries').exists()).toBe(true);
    });
  });
});
