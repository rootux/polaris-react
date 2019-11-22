import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Search} from '../Search';

describe('<Search />', () => {
  it('mounts', () => {
    const search = mountWithAppProvider(<Search />);
    expect(search.exists()).toBe(true);
  });

  it('renders its children', () => {
    const search = mountWithAppProvider(<Search>Hello Polaris</Search>);
    expect(search.text()).toContain('Hello Polaris');
  });
});
