import React, { cloneElement, isValidElement } from 'react';
import useForm from '../hooks/useForm';

import { OutgoingProps } from '../types/common';

type FormProps = {
  children: React.ReactNode;
};

export const Form = ({ children, ...rest }: FormProps) => {
  const {
    getFormProps,
    getFormMeta,
    resetForm,
    setValueManually,
    setErrorManually,
  } = useForm();

  const props: OutgoingProps = {
    ...getFormMeta(),
    resetForm,
    setValueManually,
    setErrorManually,
  };
  return (
    <form {...getFormProps(rest)}>
      {typeof children === 'function' && children(props)}
      {isValidElement(children) && cloneElement(children, props)}
    </form>
  );
};
