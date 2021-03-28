import { GetCheckedProperty } from '../types/common';

const getCheckedProperty: GetCheckedProperty = ({
  currentValue,
  initialValue,
  type,
}) => {
  if (type === 'checkbox') return currentValue;
  if (type === 'radio') return initialValue === currentValue;
  return undefined;
};

export default getCheckedProperty;
