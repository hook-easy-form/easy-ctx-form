import { createContext } from 'react';

import { TValidateFunction, onSubmit, TInitialValues } from '../types/common';

export type TFormContext = {
  onSubmit: onSubmit;
  validate?: TValidateFunction;
  initialValues?: TInitialValues;
  resetAfterSubmit?: boolean;
};

export const defaultOptions = {
  validate: undefined,
  initialValues: undefined,
  onSubmit: () => {},
  resetAfterSubmit: false,
};

export default createContext<TFormContext>(defaultOptions);
