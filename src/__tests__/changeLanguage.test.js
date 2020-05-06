import React from 'react';
import { mount } from 'enzyme';
import { useTranslation } from 'react-i18next';
import ChangeLanguage from '../components/changeLanguage';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(() => ({
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  })),
}));

let wrapper;

describe('<ChangeLanguage>', () => {
  beforeEach(() => {
    wrapper = mount(<ChangeLanguage />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {
    test('Click - Button 1 - changes language to en', () => {
      expect(wrapper.find('button').at(0).hasClass('selected')).toBe(true);
      wrapper.find('button').at(0).simulate('click');
      expect(useTranslation.mock.results[0].value.i18n.changeLanguage.mock.calls[0][0]).toBe('en');
    });
    test('Click - Button 2 - changes language to es', () => {
      expect(wrapper.find('button').at(1).hasClass('selected')).toBe(false);
      wrapper.find('button').at(1).simulate('click');
      expect(useTranslation.mock.results[1].value.i18n.changeLanguage.mock.calls[0][0]).toBe('es');
    });
  });
});
