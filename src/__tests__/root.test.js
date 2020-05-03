import React from 'react';
import { shallow } from 'enzyme';
import { Root } from '../components/root';

let saved = {};

describe('<Root>', () => {
  beforeEach(() => {
    saved = {
      spy: jest.spyOn(Root.prototype, 'render'),
      wrapper: shallow(<Root t={() => {}} />)
    };
  });
  afterEach(() => {
    saved.spy.mockReset();
    saved.spy.mockRestore();
    saved.wrapper.unmount();
    saved = {};
  });
  describe('Rendering', () => {
    test('renders once with no data change and no errors', () => {
      expect(saved.spy).toHaveBeenCalledTimes(1);
    });
  });
});
