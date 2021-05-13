import React, { useCallback, useRef, useEffect } from 'react';

import useReducerContext from './useReducerContext';
import useFormContext from './useFormContext';
import { INITIALIZE_FIELD, DESTROY_FIELD } from './useFormReducer';
import { OutgoingFieldMeta } from '../types/common';

import getValue from '../utils/getValue';
import getCheckedProperty from '../utils/getCheckedProperty';
import useFormAction from './useFieldAction';

let id = 0;
const defaultOptions = {
  type: 'text',
  value: '',
};

type InputCtxProps = {
  id: number;
  name: string;
  type: string;
  value: any;
};

type InputProps = {
  type?: string;
  value?: any;
};

export default function useField(fieldName: string, options?: InputProps) {
  if (!fieldName) throw new Error('fieldName argument(1) is required.');

  const inputProps: React.MutableRefObject<InputCtxProps> = useRef({
    id: id++,
    name: fieldName,
    ...defaultOptions,
    ...options,
  });

  const { state, dispatch } = useReducerContext();
  const { validate } = useFormContext();
  const { onChangeHandler, onBlurHandler } = useFormAction(
    inputProps.current.name,
  );

  useEffect(() => {
    const { name, type } = inputProps.current;
    if (!state.fieldInitialized[fieldName]) {
      dispatch({ type: INITIALIZE_FIELD, payload: { name, type } });
    }
  }, [dispatch, state]);

  useEffect(() => {
    return () => {
      const { name } = inputProps.current;
      dispatch({ type: DESTROY_FIELD, payload: { name } });
    };
  }, [dispatch]);

  const getInputProps = useCallback(
    ({ onChange, onBlur, ...rest } = {}) => {
      const { type, value: initialValue, name } = inputProps.current;
      const v = state.values[name];
      const value = getValue(v, type);
      return {
        value: initialValue || value,
        name,
        type,
        checked: getCheckedProperty({
          initialValue,
          currentValue: value,
          type,
        }),
        onChange: onChangeHandler(onChange),
        onBlur: onBlurHandler(onBlur),
        ...rest,
      };
    },
    [dispatch, state, validate],
  );

  const getMeta = useCallback((): OutgoingFieldMeta => {
    const { type, value, name } = inputProps.current;
    return {
      value: value || getValue(state.values[name], type),
      error: state.errors[name],
      touched: state.touched[name],
    };
  }, [state]);

  return {
    getInputProps,
    getMeta,
  };
}
