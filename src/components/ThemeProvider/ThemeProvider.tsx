import React, {useMemo, useEffect} from 'react';
import {
  ThemeContext,
  ThemeConfig,
  useParent,
  ParentContext,
  buildThemeContext,
  buildCustomProperties,
} from '../../utilities/theme';
import {useFeatures} from '../../utilities/features';

interface ThemeProviderProps {
  /** Custom logos and colors provided to select components */
  theme: ThemeConfig;
  /** The content to display */
  children?: React.ReactNode;
}

export function ThemeProvider({
  theme: themeConfig,
  children,
}: ThemeProviderProps) {
  const {unstableGlobalTheming = false} = useFeatures();
  const {parent} = useParent();
  const customProperties = useMemo(
    () => buildCustomProperties(themeConfig, unstableGlobalTheming, parent),
    [unstableGlobalTheming, themeConfig, parent],
  );
  const theme = useMemo(
    () =>
      buildThemeContext(
        themeConfig,
        unstableGlobalTheming ? customProperties : undefined,
      ),
    [customProperties, themeConfig, unstableGlobalTheming],
  );

  // We want these values to be empty string instead of `undefined` when not set.
  // Otherwise, setting a style property to `undefined` does not remove it from the DOM.
  const backgroundColor = customProperties['--p-surface-background'] || '';
  const color = customProperties['--p-text-on-surface'] || '';

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = color;
  }, [backgroundColor, color]);

  return (
    <ThemeContext.Provider value={theme}>
      <ParentContext.Provider value={{parent: true}}>
        <div style={customProperties}>{children}</div>
      </ParentContext.Provider>
    </ThemeContext.Provider>
  );
}
