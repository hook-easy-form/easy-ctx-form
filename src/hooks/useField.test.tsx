import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useFormReducer } from '../hooks/useFormReducer';
import ReducerCtx from '../context/reducerContext';
import FormCtx, { defaultOptions } from '../context/formContext';
import useField from './useField';
import useFormAction from './useFieldAction';

describe('useField', () => {
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
    value: '',
    error: '',
    touched: false,
  };

  const fieldName = 'test';

  it('should return initial field meta', () => {
    const { result } = renderHook(() => useField(fieldName), { wrapper });
    expect(result.current.getMeta()).toMatchObject(initialMeta);
  });

  it('should return initial field props', () => {
    const { result } = renderHook(() => useField(fieldName), { wrapper });
    const { result: actionResult } = renderHook(() => useFormAction(fieldName));

    act(() => {
      const res = result.current.getInputProps();
      expect({
        ...res,
        onChange: JSON.stringify(res.onChange),
        onBlur: JSON.stringify(res.onBlur),
      }).toMatchObject({
        value: '',
        name: 'test',
        type: 'text',
        checked: undefined,
        onChange: JSON.stringify(actionResult.current.onChangeHandler),
        onBlur: JSON.stringify(actionResult.current.onBlurHandler),
      });
    });
  });


  it('should return error', () => {
    try {
      const { result } = renderHook(() => useField(undefined as any), { wrapper });
      result.current.getMeta();
    } catch (error) {
      const message = 'fieldName argument(1) is required.';
      expect(error.message).toBe(message);
    }
  });
});