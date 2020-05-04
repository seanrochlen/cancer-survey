import React from 'react';
import { mount } from 'enzyme';
import CancerEntry from '../components/cancerEntry';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}));

const props = {
  cancer: { ageOfDiagnosis: 1, cancerType: 'brain' },
  cancerId: 0,
  familyId: undefined,
  handleChange: jest.fn(),
  removeEntry: jest.fn()
};
let wrapper;

describe('<CancerEntry>', () => {
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {
    test('Click - Button - removeEntry', () => {
      wrapper = mount(<CancerEntry {...props} />);
      wrapper.find('button').simulate('click');
      expect(wrapper.props().removeEntry.mock.calls.length).toEqual(1);
    });
  });
  describe('Rendering', () => {
    test('select cancerType name no familyId cancerType-${cancerId}', () => {
      wrapper = mount(<CancerEntry {...props} />);
      expect(wrapper.find('select').first().props().name).toEqual('cancerType-0');
    });
    test('select cancerType name familyId provided cancerType-${cancerId}-$(familyId)', () => {
      props.familyId = 1;
      wrapper = mount(<CancerEntry {...props} />);
      expect(wrapper.find('select').first().props().name).toEqual('cancerType-0-1');
      props.familyId = undefined;
    });
    test('select cancerType value cancer.cancerType', () => {
      wrapper = mount(<CancerEntry {...props} />);
      expect(wrapper.find('select').first().props().value).toEqual('brain');
    });
    test('select ageOfDiagnosis name no familyId ageOfDiagnosis-${cancerId}', () => {
      wrapper = mount(<CancerEntry {...props} />);
      expect(wrapper.find('select').at(1).props().name).toEqual('ageOfDiagnosis-0');
    });
    test('select ageOfDiagnosis name familyId provided ageOfDiagnosis-${cancerId}-$(familyId)', () => {
      props.familyId = 1;
      wrapper = mount(<CancerEntry {...props} />);
      expect(wrapper.find('select').at(1).props().name).toEqual('ageOfDiagnosis-0-1');
    });
    test('select ageOfDiagnosis value cancer.ageOfDiagnosis', () => {
      wrapper = mount(<CancerEntry {...props} />);
      expect(wrapper.find('select').at(1).props().value).toEqual(1);
    });
  });
});
