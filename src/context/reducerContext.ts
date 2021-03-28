import { createContext } from 'react';

import { initialState } from '../hooks/useFormReducer';
import { TFormState, TFromDispatch } from '../types/reducer';

export type Context = { state: TFormState; dispatch: TFromDispatch };

export default createContext<Context>({
  state: initialState,
  dispatch: () => {},
});
