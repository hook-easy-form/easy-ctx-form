import { renderHook, act } from '@testing-library/react-hooks';

import {
  INITIALIZE_FORM,
  INITIALIZE_FIELD,
  CHANGE_FIELD,
  ON_BLUR_FIELD,
  SET_VALIDATION,
  SET_VALIDATION_MANUALLY,
  RESET_FORM,
  DESTROY_FIELD,
  useFormReducer,
  initialState,
} from '../hooks/useFormReducer';

describe('useFormReducer', () => {
  it('should return state after form initialize action', () => {
    const { result } = renderHook(() => useFormReducer());

    const payload = {};
  
    act(() => {
      result.current[1]({ type: INITIALIZE_FORM, payload });
    });
    expect(result.current[0]).toMatchObject({ ...initialState });
  });
  
  it('should return state after field initialize action', () => {
    const { result } = renderHook(() => useFormReducer());

    const payload = { name: 'test1', type: 'text' };
  
    act(() => {
      result.current[1]({ type: INITIALIZE_FIELD, payload });
    });

    const exp = {
      fieldInitialized: { [payload.name]: true },
      values: { [payload.name]: '' },
      initialValues: { [payload.name]: '' },
      errors: { [payload.name]: '' },
      touched: { [payload.name]: false },
    };
    expect(result.current[0]).toMatchObject({ ...initialState, ...exp });
  });

  it('should return state after onchange action with validate', () => {
    const { result } = renderHook(() => useFormReducer());

    const payload = {
      name: 'test1',
      value: 'test1',
      validate: (v: any) => {
        const errors: any = {};
        if (!v.test1) errors.test1 = 'required';
        
        return errors;
      },
    };
  
    act(() => {
      result.current[1]({ type: CHANGE_FIELD, payload });
    });

    const exp = {
      values:  { [payload.name]: payload.value },
      pristine: false,
      valid: true,
    };
    expect(result.current[0]).toMatchObject({ ...initialState, ...exp });
  });

  it('should return state after onchange action without validate', () => {
    const { result } = renderHook(() => useFormReducer());

    const payload = {
      name: 'test1',
      value: 'test1',
    };
  
    act(() => {
      result.current[1]({ type: CHANGE_FIELD, payload });
    });

    const exp = {
      values: { [payload.name]: payload.value },
      pristine: false,
      valid: true,
      errors: { [payload.name]: '' },
    };
    expect(result.current[0]).toMatchObject({ ...initialState, ...exp });
  });

  it('should return state after onblur', () => {
    const { result } = renderHook(() => useFormReducer());

    const payload = {
      name: 'test1',
    };
  
    act(() => {
      result.current[1]({ type: ON_BLUR_FIELD, payload });
    });

    const exp = {
      touched: { [payload.name]: true },
      anyTouched: true,
    };
    expect(result.current[0]).toMatchObject({ ...initialState, ...exp });
  });

  it('should return state after set validation action', () => {
    const { result } = renderHook(() => useFormReducer());

    const payload = {
      name: 'required',
    };
  
    act(() => {
      result.current[1]({ type: SET_VALIDATION, payload });
    });

    const exp = {
      errors: payload,
      valid: false,
      anyTouched: true,
    };
    expect(result.current[0]).toMatchObject({ ...initialState, ...exp });
  });

  it('should return state after set validation manually action', () => {
    const { result } = renderHook(() => useFormReducer());

    const payload = {
      name: 'test1',
      error: 'required',
    };
  
    act(() => {
      result.current[1]({ type: SET_VALIDATION_MANUALLY, payload });
    });

    const exp = {
      errors: { [payload.name]: payload.error },
      valid: false,
      anyTouched: true,
    };
    expect(result.current[0]).toMatchObject({ ...initialState, ...exp });
  });

  it('should return state after reset form action', () => {
    const { result } = renderHook(() => useFormReducer());

    act(() => {
      result.current[1]({ type: RESET_FORM });
    });

    expect(result.current[0]).toMatchObject({ ...initialState });
  });

  it('should return state after destroy field action', () => {
    const { result } = renderHook(() => useFormReducer());

    const payload = { name: 'test1', type: 'text' };
  
    act(() => {
      result.current[1]({ type: INITIALIZE_FIELD, payload });
    });

    act(() => {
      result.current[1]({ type: DESTROY_FIELD, payload: { name: payload.name } });
    });

    expect(result.current[0]).toMatchObject({ ...initialState });
  });

  it('should return error', () => {
    const { result } = renderHook(() => useFormReducer());

    act(() => {
      result.current[1]({ type: 'unknown' });
    });

    expect(result.error).toEqual(Error('Unknown action'));
  });
});