import * as commonTypes from './common';
import {
  INITIALIZE_FIELD,
  INITIALIZE_FORM,
  CHANGE_FIELD,
  ON_BLUR_FIELD,
  SET_VALIDATION,
  RESET_FORM,
  DESTROY_FIELD,
  SET_VALIDATION_MANUALLY,
} from '../hooks/useFormReducer';

interface InitializeForm {
  type: typeof INITIALIZE_FORM;
  payload: { initialValues?: commonTypes.TInitialValues };
}

interface InitializeField {
  type: typeof INITIALIZE_FIELD;
  payload: {
    name: string;
    type: string;
  };
}

interface ChangeField {
  type: typeof CHANGE_FIELD;
  payload: {
    name: string;
    value: any;
    validate?: commonTypes.TValidateFunction;
  };
}

interface BlurField {
  type: typeof ON_BLUR_FIELD;
  payload: {
    name: string;
  };
}

interface SetValidation {
  type: typeof SET_VALIDATION;
  payload: commonTypes.TErrors;
}

interface SetValidationManually {
  type: typeof SET_VALIDATION_MANUALLY;
  payload: {
    name: string;
    error: string;
  };
}

interface ResetForm {
  type: typeof RESET_FORM;
}

interface DestroyField {
  type: typeof DESTROY_FIELD;
  payload: {
    name: string;
  };
}

export type FormActions =
  | InitializeForm
  | InitializeField
  | ChangeField
  | BlurField
  | SetValidation
  | ResetForm
  | DestroyField
  | SetValidationManually;

export type TFormState = {
  fieldInitialized: commonTypes.TFieldInitialized;
  values: commonTypes.TValues;
  initialValues: commonTypes.TInitialValues;
  errors: commonTypes.TErrors;
  touched: commonTypes.TTouched;
  valid: boolean;
  pristine: boolean;
  anyTouched: boolean;
};
export type TFromDispatch = React.Dispatch<FormActions>;
