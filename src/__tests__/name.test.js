import React from 'react';
import { mount } from 'enzyme';
import Name from '../components/name';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}));

const props = {
  firstName: '',
  lastName: '',
  handleChange: jest.fn()
};
let wrapper;

describe('<Name>', () => {
  beforeEach(() => {
    wrapper = mount(<Name {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {
    test('Change - Input firstName - handleChange', () => {
      wrapper.find('input[name="firstName"]').simulate('change', { target: { value : 'test'} } );
      expect(wrapper.props().handleChange.mock.calls.length).toBe(1);
    });
    test('Change - Input lastName - handleChange', () => {
      wrapper.find('input[name="lastName"]').simulate('change', { target: { value : 'test'} } );
      expect(wrapper.props().handleChange.mock.calls.length).toBe(2);
    });
  });
  describe('Rendering', () => {
    test('Input firstName value test', () => {
      wrapper.setProps({ firstName: 'test' });
      expect(wrapper.find('input[name="firstName"]').props().value).toBe('test');
    });
    test('Input lastName value test', () => {
      wrapper.setProps({ lastName: 'test' });
      expect(wrapper.find('input[name="lastName"]').props().value).toBe('test');
    });
  });
});
