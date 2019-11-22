import React from 'react';
import {Theme, Parent} from './types';

export const ThemeContext = React.createContext<Theme | undefined>(undefined);

export const ParentContext = React.createContext<Parent>({
  parent: false,
});
