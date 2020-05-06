import React from 'react';
import { mount } from 'enzyme';
import Relationship from '../components/relationship';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const props = {
  familyId: 0,
  handleChange: jest.fn(),
  person: { id: 12345, relationship: 'father' },
};
let wrapper;

describe('<Relationship>', () => {
  beforeEach(() => {
    /* eslint-disable react/jsx-props-no-spreading */
    wrapper = mount(<Relationship {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {
    test('Change - Select relationship - handleChange', () => {
      wrapper.find('select').simulate('change', { target: { value: 'son' } });
      expect(wrapper.props().handleChange.mock.calls.length).toBe(1);
    });
  });
  describe('Rendering', () => {
    test('select relationship name is relationship-familyId', () => {
      expect(wrapper.find('select').props().name).toBe('relationship-0');
    });
    test('select relationship value person.relationship', () => {
      expect(wrapper.find('select').props().value).toBe('father');
    });
  });
});
