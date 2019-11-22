import {useContext} from 'react';
import {MissingAppProviderError} from '../errors';
import {ThemeContext, ParentContext} from './context';

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new MissingAppProviderError('No Theme was provided.');
  }

  return theme;
}

export function useParent() {
  const parent = useContext(ParentContext);

  // if (!parent) {
  //   throw new MissingAppProviderError('No Parent was provided.');
  // }

  return parent;
}
