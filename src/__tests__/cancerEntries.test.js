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
      expect(wrapper.props().addCancerDiagnosis.mock.calls.length).toEqual(1);
    });
  });
  describe('Rendering', () => {
    test('no render of .cancerEntries if no entries in cancers', () => {
      wrapper.find('.cancerEntries').length = 0;
    });
    test('render .cancerEntries if entries in cancers', () => {
      wrapper.props().cancers = ['1'];
      wrapper.find('.cancerEntries').length = 1;
    });
  });
});
