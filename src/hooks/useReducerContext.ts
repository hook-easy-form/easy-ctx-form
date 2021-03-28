import { useContext } from 'react';
import ReducerCtx from '../context/reducerContext';

export default function useReducerContext() {
  return useContext(ReducerCtx);
}
