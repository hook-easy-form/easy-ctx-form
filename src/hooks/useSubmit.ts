import { useCallback } from 'react';

import useReducerContext from './useReducerContext';
import useFormContext from './useFormContext';

import { HandleSubmit } from '../types/common';
import { RESET_FORM, SET_VALIDATION } from './useFormReducer';

export default function useSubmit() {
  const { state, dispatch } = useReducerContext();
  const { validate, onSubmit, resetAfterSubmit } = useFormContext();

  const handleSubmit: HandleSubmit = (s) => async (event) => {
    if (event.persist) event.persist();
    if (event.preventDefault) event.preventDefault();

    if ((!s.anyTouched || !s.valid) && validate && typeof validate === 'function') {
      dispatch({ type: SET_VALIDATION, payload: validate(s.values) });
    } else {
      if (onSubmit && typeof onSubmit === 'function') onSubmit(s.values);
      if (resetAfterSubmit) dispatch({ type: RESET_FORM });
    }
  };

  return useCallback(handleSubmit(state), [state, resetAfterSubmit, validate]);
}
