import React from 'react';
import { mount } from 'enzyme';
import FamilyEntry from '../components/familyEntry';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}));

const props = {
  addCancerDiagnosis: jest.fn(),
  family: [{ id: 12345, name: '', age: '', motherId: null, fatherId: null, gender: '', relationship: '', cancers: [] }],
  handleChange: jest.fn(),
  person: { id: 12345, name: 'hello', age: '2' },
  removeEntry: jest.fn()
};
let wrapper;

describe('<FamilyEntry>', () => {
  beforeEach(() => {
    wrapper = mount(<FamilyEntry {...props} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {
    test('Click - Button - removeEntry', () => {
      wrapper.find('button').first().simulate('click');
      expect(wrapper.props().removeEntry.mock.calls.length).toEqual(1);
    });
    test('Change - Input name-${familyId} - handleChange', () => {
      wrapper.find('#nameInput').simulate('change', { target: { value : 'hi'} } );
      expect(wrapper.props().handleChange.mock.calls.length).toEqual(1);
    });
    test('Change - Select age-${familyId} - handleChange', () => {
      wrapper.find('select').first().simulate('change', { target: { value : '5'} } );
      expect(wrapper.props().handleChange.mock.calls.length).toEqual(2);
    });
  });
  describe('Rendering', () => {
    test('Input - name-${familyId} - person.name', () => {
      expect(wrapper.find('#nameInput').props().value).toEqual('hello');
    });
    test('Select - age-${familyId} - person.age', () => {
      expect(wrapper.find('select').first().props().value).toEqual('2');
    });
  });
});
