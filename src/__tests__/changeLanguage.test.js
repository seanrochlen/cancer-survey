import React from 'react';
import { mount } from 'enzyme';
import ChangeLanguage from '../components/changeLanguage';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(() => ({
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en'
    }
  }))
}));

import { useTranslation } from 'react-i18next';

let wrapper;

describe('<ChangeLanguage>', () => {
  beforeEach(() => {
    wrapper = mount(<ChangeLanguage />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe('Events', () => {
    test('Click - Button 1 - useTranslation.i18n.changeLanguage - changes language to en', () => {
      wrapper.find('button').at(1).simulate('click');
      expect(wrapper.find('button').at(0).hasClass('selected')).toEqual(true);
      expect(useTranslation.mock.results[0].value.i18n.changeLanguage.mock.calls.length).toEqual(1);
    });
  });
});
