import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {ThemeProvider} from '../ThemeProvider';
import {ThemeContext, useTheme} from '../../../utilities/theme';

describe('<ThemeProvider />', () => {
  it('mounts', () => {
    const themeProvider = mountWithAppProvider(
      <ThemeProvider theme={{logo: {}}}>
        <p>Hello</p>
      </ThemeProvider>,
    );
    expect(themeProvider.exists()).toBe(true);
  });

  it('passes context', () => {
    const Child: React.SFC = (_props) => {
      return (
        <ThemeContext.Consumer>
          {(polarisTheme) => {
            return polarisTheme && polarisTheme.logo ? <div /> : null;
          }}
        </ThemeContext.Consumer>
      );
    };

    const wrapper = mountWithAppProvider(
      <ThemeProvider
        theme={{
          logo: {
            width: 104,
            topBarSource:
              'https://cdn.shopify.com/shopify-marketing_assets/static/shopify-full-color-white.svg',
            contextualSaveBarSource:
              'https://cdn.shopify.com/shopify-marketing_assets/static/shopify-full-color-black.svg',
          },
        }}
      >
        <Child />
      </ThemeProvider>,
    );

    const div = wrapper.find(Child).find('div');

    expect(div.exists()).toBe(true);
  });

  it('has a default theme', () => {
    const wrapper = mountWithAppProvider(
      <ThemeProvider theme={{}}>
        <p />
      </ThemeProvider>,
    );

    expect(wrapper.find('div').props().style).toStrictEqual(
      expect.objectContaining({
        '--top-bar-background': '#00848e',
        '--top-bar-background-lighter': '#1d9ba4',
        '--top-bar-color': '#f9fafb',
      }),
    );
  });

  it('sets a provided theme', () => {
    const wrapper = mountWithAppProvider(
      <ThemeProvider
        theme={{
          colors: {
            topBar: {
              background: '#108043',
            },
          },
        }}
      >
        <p />
      </ThemeProvider>,
    );

    expect(wrapper.find('div').props().style).toStrictEqual(
      expect.objectContaining({
        '--top-bar-background': '#108043',
        '--top-bar-background-lighter': 'hsla(147, 63%, 43%, 1)',
        '--top-bar-color': 'rgb(255, 255, 255)',
      }),
    );
  });

  it('updates themes', () => {
    const wrapper = mountWithAppProvider(
      <ThemeProvider
        theme={{
          colors: {
            topBar: {
              background: '#108043',
            },
          },
        }}
      >
        <p />
      </ThemeProvider>,
    );

    wrapper.setProps({
      theme: {
        colors: {
          topBar: {
            background: '#021123',
          },
        },
      },
    });
    wrapper.update();

    expect(wrapper.find('div').props().style).toStrictEqual(
      expect.objectContaining({
        '--top-bar-background': '#021123',
        '--top-bar-background-lighter': 'hsla(213, 74%, 22%, 1)',
        '--top-bar-color': 'rgb(255, 255, 255)',
      }),
    );
  });

  it('sets color system properties when global theming is enabled', () => {
    const themeProvider = mountWithAppProvider(
      <ThemeProvider theme={{}}>
        <p>Hello</p>
      </ThemeProvider>,
      {features: {unstableGlobalTheming: true}},
    );

    expect(themeProvider.find('div').props().style).toStrictEqual(
      expect.objectContaining({
        '--p-surface-background': 'hsla(0, 0%, 98%, 1)',
      }),
    );
  });

  it('sets color system properties in context when global theming is enabled', () => {
    mountWithAppProvider(
      <ThemeProvider theme={{}}>
        <Child />
      </ThemeProvider>,
      {features: {unstableGlobalTheming: true}},
    );

    function Child() {
      const {UNSTABLE_cssCustomProperties} = useTheme();
      expect(UNSTABLE_cssCustomProperties).toBeTruthy();
      return null;
    }
  });

  it('does not set color system properties in context by default', () => {
    mountWithAppProvider(
      <ThemeProvider theme={{}}>
        <Child />
      </ThemeProvider>,
    );

    function Child() {
      const {UNSTABLE_cssCustomProperties} = useTheme();
      expect(UNSTABLE_cssCustomProperties).toBeUndefined();
      return null;
    }
  });

  describe('when nested', () => {
    it('does not set a default theme', () => {
      const themeProvider = mountWithAppProvider(
        <ThemeProvider theme={{}}>
          <ThemeProvider theme={{}}>
            <p>Hello</p>
          </ThemeProvider>
        </ThemeProvider>,
        {features: {unstableGlobalTheming: true}},
      );

      expect(
        themeProvider
          .find('div')
          .last()
          .props().style,
      ).toStrictEqual({});
    });
    it.todo('only adds css custom properties for color roles provided');

    it.todo('does not set body text and background color');
    it.todo('inherits isLight from parent <ThemeProvider>');
    it.todo(
      'overrides isLight from parent <ThemeProvider> when provided a surface value',
    );
  });
});
