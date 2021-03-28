import { TFormState } from './reducer';

export type TFieldInitialized = Record<string, boolean>;
export type TValues = Record<string, any>;
export type TInitialValues = Record<string, any>;
export type TErrors = Record<string, string>;
export type TTouched = Record<string, boolean>;

export type onSubmit = (v: TValues) => void | Promise<void>;
export type TValidateFunction = (v: TValues) => TErrors;

export type OutgoingFieldMeta = {
  value: any;
  error: string;
  touched: boolean;
};

export type OutgoingFormMeta = {
  anyTouched: boolean;
  valid: boolean;
  pristine: boolean;
  values: TValues;
  errors: TErrors;
};

export type OutgoingProps = OutgoingFormMeta & {
  resetForm: ResetForm;
  setValueManually: SetValueManually;
  setErrorManually: SetErrorManually;
};

type ReactEvent = React.ChangeEvent<HTMLInputElement>;

export type HandleSubmit = (
  s: TFormState,
) => (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
export type ResetForm = () => void;
export type SetValueManually = (name: string, value: any) => void;
export type SetErrorManually = (name: string, error: string) => void;
export type OnBlurHandler = (
  onBlur?: (e: ReactEvent) => void,
) => (e: ReactEvent) => void;
export type OnChangeHandler = (
  onChange?: (e: ReactEvent) => void,
) => (e: ReactEvent) => void;
type CheckedPayload = { currentValue: any; initialValue: any; type?: string };
export type GetCheckedProperty = (p: CheckedPayload) => boolean | undefined;
