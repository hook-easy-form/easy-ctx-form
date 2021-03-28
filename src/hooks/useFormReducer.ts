import { useReducer } from 'react';

import * as reducerTypes from '../types/reducer';

import logger from '../utils/logger';
import getValue from '../utils/getValue';
import getPristineProperty from '../utils/getPristineProperty';
import getValidProperty from '../utils/getValidProperty';
import changeAllTouchedProperties from '../utils/changeAllTouchedProperties';
import resetAllErrorsProperty from '../utils/resetAllErrorsProperty';
import rmFieldsFromObject from '../utils/rmFieldsFromObject';

export const INITIALIZE_FORM = '@form^//INITIALIZE_FORM';
export const INITIALIZE_FIELD = '@form^//INITIALIZE_FIELD';
export const CHANGE_FIELD = '@form^//CHANGE_FIELD';
export const ON_BLUR_FIELD = '@form^//ON_BLUR_FIELD';
export const SET_VALIDATION = '@form^//SET_VALIDATION';
export const SET_VALIDATION_MANUALLY = '@form^//SET_VALIDATION_MANUALLY';
export const RESET_FORM = '@form^//RESET_FORM';
export const DESTROY_FIELD = '@form^//DESTROY_FIELD';

export const initialState = {
  fieldInitialized: {},
  values: {},
  errors: {},
  initialValues: {},
  touched: {},
  valid: true,
  pristine: true,
  anyTouched: false,
};

function reducer(
  state: reducerTypes.TFormState,
  action: reducerTypes.FormActions,
) {
  switch (action.type) {
    case INITIALIZE_FORM: {
      const { initialValues } = action.payload;
      return {
        ...state,
        initialValues: initialValues || state.initialValues,
        values: initialValues || state.values,
      };
    }
    case INITIALIZE_FIELD: {
      const { name, type } = action.payload;

      const v = getValue(undefined, type);
      return {
        ...state,
        fieldInitialized: { ...state.fieldInitialized, [name]: true },
        values: { ...state.values, [name]: v },
        initialValues: { ...state.initialValues, [name]: v },
        errors: { ...state.errors, [name]: '' },
        touched: { ...state.touched, [name]: false },
      };
    }
    case CHANGE_FIELD: {
      const { name, value, validate } = action.payload;

      const values = { ...state.values, [name]: value };

      if (validate && typeof validate === 'function') {
        const errors = validate(values);
        return {
          ...state,
          values,
          pristine: getPristineProperty(values, state.initialValues),
          errors,
          valid: getValidProperty(errors),
        };
      }

      const errors = { ...state.errors, [name]: '' };
      return {
        ...state,
        values,
        pristine: getPristineProperty(values, state.initialValues),
        errors,
        valid: getValidProperty(errors),
      };
    }
    case ON_BLUR_FIELD: {
      const { name } = action.payload;

      return {
        ...state,
        touched: {
          ...state.touched,
          [name]: true,
        },
        anyTouched: true,
      };
    }
    case SET_VALIDATION: {
      const touched = changeAllTouchedProperties(state.touched, true);
      return {
        ...state,
        errors: action.payload,
        valid: getValidProperty(action.payload),
        touched,
        anyTouched: true,
      };
    }
    case SET_VALIDATION_MANUALLY: {
      const { name, error } = action.payload;
      const touched = changeAllTouchedProperties(state.touched, true);

      const errors = { ...state.errors, [name]: error };

      return {
        ...state,
        errors,
        valid: getValidProperty(errors),
        touched,
        anyTouched: true,
      };
    }
    case RESET_FORM: {
      const touched = changeAllTouchedProperties(state.touched, false);
      const errors = resetAllErrorsProperty(state.errors);

      return {
        ...state,
        values: state.initialValues,
        errors,
        touched,
        valid: true,
        pristine: true,
        anyTouched: false,
      };
    }
    case DESTROY_FIELD: {
      const { name } = action.payload;
      return {
        ...state,
        fieldInitialized: rmFieldsFromObject(state.fieldInitialized, [name]),
        values: rmFieldsFromObject(state.values, [name]),
        errors: rmFieldsFromObject(state.errors, [name]),
        touched: rmFieldsFromObject(state.touched, [name]),
        initialValues: rmFieldsFromObject(state.initialValues, [name]),
      };
    }

    default:
      throw new Error('Unknown action');
  }
}

export const useFormReducer = (debug = false) => {
  return useReducer(debug ? logger(reducer) : reducer, initialState);
};
