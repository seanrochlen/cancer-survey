import React from 'react';
import { shallow } from 'enzyme';
import { Root } from '../../src/components/root';

let wrapper;
let spy;

describe('<Root>', () => {
  beforeEach(() => {
    spy = jest.spyOn(Root.prototype, 'render');
    wrapper = shallow(<Root patientId="patient0" submitFormData={() => {}} t={() => {}} />);
  });
  afterEach(() => {
    spy.mockReset();
    spy.mockRestore();
    wrapper.unmount();
  });
  describe('Events', () => {
    test('onSubmit - form  - submitData', () => {
      wrapper.instance().submitData = jest.fn();
      wrapper.instance().forceUpdate();
      wrapper.find('form input[type="submit"]').simulate('click');
      expect(spy).toBeCalled();
    });
  });
  describe('Methods', () => {
    describe('addCancerDiagnosis(familyId)', () => {
      test('No familyId pushes a new entry into cancers', () => {
        wrapper.instance().addCancerDiagnosis();
        expect(wrapper.state('cancers').length).toBe(1);
      });
      test('Passed familyId pushes a new entry into family cancers', () => {
        wrapper.setState({ family: [{ id: '12345', name: '', age: '', motherId: null, fatherId: null, gender: '', relationship: '', cancers: [] }] });
        wrapper.instance().addCancerDiagnosis(0);
        expect(wrapper.state('family')[0].cancers.length).toBe(1);
      });
    });
    describe('addFamilyMember', () => {
      test('Calling addFamilyMember adds a entry to state family', () => {
        wrapper.instance().addFamilyMember();
        expect(wrapper.state('family').length).toBe(1);
      });
    });
    describe('handleChange', () => {
      describe('patient - splitName.length === 1', () => {
        test('setstate [target.name]: value', () => {
          const e = {
            target: {
              type: 'text',
              name: 'firstName',
              value: 'hello',
            },
          };
          wrapper.instance().handleChange(e);
          expect(wrapper.state('firstName')).toBe('hello');
        });
      });
      describe('cancers or family - splitName.length === 2', () => {
        describe('cancers', () => {
          test('update cancers entry when name includes cancerType or ageOfDiagnosis - value = splitName[0], position = splitName[1]', () => {
            wrapper.setState({ cancers: [{ id: '12345', ageOfDiagnosis: '', cancerType: '' }] });
            const e = {
              target: {
                type: 'select-one',
                name: 'cancerType-0',
                value: 'brain',
              },
            };
            wrapper.instance().handleChange(e);
            expect(wrapper.state('cancers')[0].cancerType).toBe('brain');
          });
        });
        describe('family', () => {
          test('updates family entry', () => {
            wrapper.setState({ family: [{ id: '12345', name: '', age: '', motherId: '', fatherId: '', gender: '', relationship: '', cancers: [] }] });
            const e = {
              target: {
                type: 'select-one',
                name: 'age-0',
                value: '1',
              },
            };
            wrapper.instance().handleChange(e);
            expect(wrapper.state('family')[0].age).toBe('1');
          });
        });
      });
      describe('family cancers - splitName.length === 3', () => {
        test('update family cancers entry', () => {
          wrapper.setState(
            {
              family: [{
                id: '12345',
                name: '',
                age: '',
                motherId: '',
                fatherId: '',
                gender: '',
                relationship: '',
                cancers: [{ id: '123', ageOfDiagnosis: '', cancerType: '' }],
              }],
            },
          );
          const e = {
            target: {
              type: 'select-one',
              name: 'cancerType-0-0',
              value: 'brain',
            },
          };
          wrapper.instance().handleChange(e);
          expect(wrapper.state('family')[0].cancers[0].cancerType).toBe('brain');
        });
      });
    }); // handleChange
    describe('removeEntry(field, index, familyId)', () => {
      test('field is not cancers remove the family index', () => {
        wrapper.setState({ family: [{ id: '12345', name: '', age: '', motherId: '', fatherId: '', gender: '', relationship: '', cancers: [] }] });
        wrapper.instance().removeEntry('family', 0);
        expect(wrapper.state('family').length).toBe(0);
      });
      test('field is cancers and no familyId - remove the cancers index', () => {
        wrapper.setState({ cancers: [{ id: '12345', ageOfDiagnosis: '', cancerType: '' }] });
        wrapper.instance().removeEntry('cancers', 0);
        expect(wrapper.state('cancers').length).toBe(0);
      });
      test('field is cancers and familyId - remove the cancers index at family familyId', () => {
        wrapper.setState(
          {
            family: [{
              id: '12345',
              name: '',
              age: '',
              motherId: '',
              fatherId: '',
              gender: '',
              relationship: '',
              cancers: [{ id: '123', ageOfDiagnosis: '', cancerType: '' }],
            }],
          },
        );
        wrapper.instance().removeEntry('cancers', 0, 0);
        expect(wrapper.state('family')[0].cancers.length).toBe(0);
      });
    }); // removeEntry
    describe('submitData', () => {
      // tbd once this is function is complete
    });
  });
  describe('Rendering', () => {
    test('renders once with no data change and no errors', () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
    test('disabled false does not display submission-text and modal, main empty className', () => {
      expect(wrapper.find('.submission-text').exists()).toBe(false);
      expect(wrapper.find('.modal').exists()).toBe(false);
      expect(wrapper.find('main').hasClass('disabled')).toBe(false);
    });
    test('disabled true displays submission-text and modal, main className disabled', () => {
      wrapper.setState({ disabled: true });
      expect(wrapper.find('.submission-text').exists()).toBe(true);
      expect(wrapper.find('.modal').exists()).toBe(true);
      expect(wrapper.find('main').hasClass('disabled')).toBe(true);
    });
  });
});
