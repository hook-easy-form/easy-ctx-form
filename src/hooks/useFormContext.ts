import { useContext } from 'react';
import FormCtx from '../context/formContext';

export default function useFormContext() {
  return useContext(FormCtx);
}
