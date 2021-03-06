import React from 'react';
import { mount } from 'enzyme';
import DateOfBirth from '../../src/components/dateOfBirth';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const props = {
  birthDay: '1',
  birthMonth: '2',
  birthYear: '1950',
  handleChange: jest.fn(),
};
let wrapper;

describe('<DateOfBirth>', () => {
  beforeEach(() => {
    /* eslint-disable react/jsx-props-no-spreading */
    wrapper = mount(<DateOfBirth {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {
    test('Change - Select birthMonth - handleChange', () => {
      wrapper.find('select').at(0).simulate('change', { target: { value: '5' } });
      expect(wrapper.props().handleChange.mock.calls.length).toBe(1);
    });
    test('Change - Select birthDay - handleChange', () => {
      wrapper.find('select').at(1).simulate('change', { target: { value: '10' } });
      expect(wrapper.props().handleChange.mock.calls.length).toBe(2);
    });
    test('Change - Select birthYear - handleChange', () => {
      wrapper.find('select').at(2).simulate('change', { target: { value: '2000' } });
      expect(wrapper.props().handleChange.mock.calls.length).toBe(3);
    });
  });
  describe('Rendering', () => {
    test('Select - birthMonth value is state birthMonth', () => {
      expect(wrapper.find('select').at(0).props().value).toBe('2');
    });
    test('Select - birthDay value is state birthDay', () => {
      expect(wrapper.find('select').at(1).props().value).toBe('1');
    });
    test('Select - birthYear value is state birthYear', () => {
      expect(wrapper.find('select').at(2).props().value).toBe('1950');
    });
  });
});
