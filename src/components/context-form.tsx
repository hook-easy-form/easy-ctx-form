import React, { useMemo, useEffect, useState, useCallback } from 'react';
import ReducerCtx from '../context/reducerContext';
import FormCtx, { TFormContext, defaultOptions } from '../context/formContext';
import { useFormReducer } from '../hooks/useFormReducer';

import { onSubmit, TValidateFunction, TInitialValues } from '../types/common';

import { Form } from './form';

type ProviderProps = {
  children: React.ReactNode;
  onSubmit: onSubmit;
  validate?: TValidateFunction;
  initialValues?: TInitialValues;
  debug?: boolean;
  resetAfterSubmit?: boolean;
  // All other props
  [x: string]: any;
};

export const FormContext = ({
  children,
  onSubmit,
  validate,
  initialValues,
  resetAfterSubmit,
  debug,
  ...rest
}: ProviderProps) => {
  const [formOptions, setFormOptions] = useState<TFormContext>(defaultOptions);

  useEffect(() => {
    saveToState();
  }, [resetAfterSubmit, validate, onSubmit, initialValues]);

  const saveToState = useCallback(() => {
    setFormOptions((ps) => ({
      ...ps,
      initialValues,
      resetAfterSubmit,
      validate,
      onSubmit,
    }));
  }, [initialValues, resetAfterSubmit, validate, onSubmit]);

  const [state, dispatch] = useFormReducer(debug);

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <ReducerCtx.Provider value={value}>
      <FormCtx.Provider value={formOptions}>
        <Form {...rest}>{children}</Form>
      </FormCtx.Provider>
    </ReducerCtx.Provider>
  );
};
