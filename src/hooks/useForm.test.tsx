import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useFormReducer } from '../hooks/useFormReducer';
import ReducerCtx from '../context/reducerContext';
import FormCtx, { defaultOptions } from '../context/formContext';
import useForm from './useForm';
import useSubmit from './useSubmit';

describe('useForm', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useFormReducer();
    return (
      <ReducerCtx.Provider value={{state, dispatch}}>
        <FormCtx.Provider value={defaultOptions}>
          {children}
        </FormCtx.Provider>
      </ReducerCtx.Provider>
    );
  };

  const initialMeta = {
    anyTouched: false,
    valid: true,
    pristine: true,
    values: {},
    errors: {},
  };

  it('should return initial form', () => {
    const { result } = renderHook(() => useForm(), { wrapper });
    expect(result.current.getFormMeta()).toMatchObject(initialMeta);
  });
  
  it('should return initial form after reset', () => {
    const { result } = renderHook(() => useForm(), { wrapper });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.getFormMeta()).toMatchObject(initialMeta);
  });
  
  it('should return form after setValueManually', () => {
    const { result } = renderHook(() => useForm(), { wrapper });

    act(() => {
      result.current.setValueManually('test', 'test');
    });

    expect(result.current.getFormMeta()).toMatchObject({
      ...initialMeta,
      pristine: false,
      values: { test: 'test' },
    });
  });
  
  it('should return form after setErrorManually', () => {
    const { result } = renderHook(() => useForm(), { wrapper });

    act(() => {
      result.current.setErrorManually('test', 'test');
    });

    expect(result.current.getFormMeta()).toMatchObject({
      ...initialMeta,
      anyTouched: true,
      valid: false,
      errors: { test: 'test' },
    });
  });
  
  it('should return form after getFormProps', () => {
    const { result } = renderHook(() => useForm(), { wrapper });
    const { result: submitResult } = renderHook(() => useSubmit());

    act(() => {
      const res = result.current.getFormProps();
      expect(JSON.stringify(res)).toBe(JSON.stringify({
        onSubmit: submitResult.current,
      }));
    });
  });
});
