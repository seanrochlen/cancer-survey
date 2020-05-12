import React from 'react';
import { mount } from 'enzyme';
import Footer from '../../src/components/footer';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

let wrapper;

describe('<Footer>', () => {
  beforeEach(() => {
    wrapper = mount(<Footer />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Rendering', () => {
    test('footer renders successfully', () => {
      expect(wrapper.find('footer').exists()).toBe(true);
    });
  });
});
