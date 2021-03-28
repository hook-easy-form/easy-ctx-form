import { useEffect, useCallback } from 'react';

import useReducerContext from './useReducerContext';
import useFormContext from './useFormContext';

import {
  OutgoingFormMeta,
  SetErrorManually,
  SetValueManually,
  ResetForm,
} from '../types/common';
import {
  INITIALIZE_FORM,
  RESET_FORM,
  CHANGE_FIELD,
  SET_VALIDATION_MANUALLY,
} from './useFormReducer';
import useSubmit from './useSubmit';

export default function useForm() {
  const { state, dispatch } = useReducerContext();
  const { validate, initialValues } = useFormContext();

  const submit = useSubmit();

  useEffect(() => {
    dispatch({
      type: INITIALIZE_FORM,
      payload: { initialValues: initialValues },
    });
  }, [initialValues]);

  const resetForm: ResetForm = useCallback(() => {
    dispatch({ type: RESET_FORM });
  }, [dispatch]);

  const setValueManually: SetValueManually = useCallback(
    (name, value) => {
      const payload = { value, name, validate };
      dispatch({ type: CHANGE_FIELD, payload });
    },
    [dispatch, validate],
  );

  const setErrorManually: SetErrorManually = useCallback(
    (name, error) => {
      const payload = { error, name };
      dispatch({ type: SET_VALIDATION_MANUALLY, payload });
    },
    [dispatch, validate],
  );

  const getFormProps = useCallback(
    (props = {}) => {
      return {
        onSubmit: submit,
        ...props,
      };
    },
    [state],
  );

  const getFormMeta = useCallback((): OutgoingFormMeta => {
    const { anyTouched, valid, pristine, values, errors } = state;
    return {
      anyTouched,
      valid,
      pristine,
      values,
      errors,
    };
  }, [state]);

  return {
    getFormProps,
    getFormMeta,
    resetForm,
    setValueManually,
    setErrorManually,
  };
}
