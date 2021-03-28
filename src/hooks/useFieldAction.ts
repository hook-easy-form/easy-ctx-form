import { useCallback } from 'react';

import useReducerContext from './useReducerContext';
import useFormContext from './useFormContext';

import { OnChangeHandler, OnBlurHandler } from '../types/common';
import { ON_BLUR_FIELD, CHANGE_FIELD } from './useFormReducer';

export default function useFormAction(name: string) {
  const { dispatch } = useReducerContext();
  const { validate } = useFormContext();

  const onChangeHandler: OnChangeHandler = useCallback(
    (onChange) => (e) => {
      const { value, type, checked } = e.target;

      const inputValue = type === 'checkbox' ? checked : value;
      const payload = { value: inputValue, name, validate };
      dispatch({ type: CHANGE_FIELD, payload });
      if (typeof onChange === 'function') onChange(e);
    },
    [dispatch, validate],
  );

  const onBlurHandler: OnBlurHandler = useCallback(
    (onBlur) => (e) => {
      const payload = { name };
      dispatch({ type: ON_BLUR_FIELD, payload });
      if (onBlur && typeof onBlur === 'function') onBlur(e);
    },
    [dispatch],
  );

  return { onChangeHandler, onBlurHandler };
}
