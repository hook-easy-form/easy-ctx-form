import { TInitialValues, TValues } from '../types/common';

export default (values: TValues, initialValues: TInitialValues): boolean => {
  return Object.keys(values).reduce((acc, el) => {
    if (!acc) return acc;

    return values[el] === initialValues[el];
  }, true as boolean);
};
