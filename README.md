## easy-ctx-form
![npm](https://img.shields.io/npm/dm/easy-ctx-form.svg?label=%E2%8F%ACdownloads&style=for-the-badge)
![npm](https://img.shields.io/npm/v/easy-ctx-form.svg?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/easy-ctx-form.svg?label=%F0%9F%93%9Clicense&style=for-the-badge)

## Setup

```bash
npm install hook-easy-form --save
```

## Usage

<details>
  <summary>Simple form example of a FaCC</summary>
  
```jsx
import { FormContext, useField } from 'easy-ctx-form';

const Input = ({ name, value, type }) => {
  const { getInputProps, getMeta } = useField(name, { value, type });
  const { error, touched } = getMeta();
  return (
    <div>
      <input {...getInputProps()} />
      {touched && error && <span>{error}</span>}
    </div>
  );
};


export default () => {
  return (
    <FormContext
      onSubmit={(v) => console.log(v)}
    >
      {(props) => (
        <>
          <Input name="email" type="email" />
          <Input name="password" type="password" />
          <button type="submit" disabled={props.pristine}>
            submit
          </button>
        </>
      )}
    </FormContext>
  );
};
```
</details>

<details>
  <summary>Simple form example without FaCC</summary>
  
```jsx
import { FormContext, useField } from 'easy-ctx-form';

const Input = ({ name, value, type }) => {
  const { getInputProps, getMeta } = useField(name, { value, type });
  const { error, touched } = getMeta();
  return (
    <div>
      <input {...getInputProps()} />
      {touched && error && <span>{error}</span>}
    </div>
  );
};

const ChildrenComponent = (props) => {
  return (
    <>
      <Input name="email" type="email" />
      <Input name="password" type="password" />

      <div>
        <button type="submit" disabled={props.pristine}>
          submit
        </button>
        <button type="button" onClick={props.resetForm}>
          reset
        </button>
      </div>
    </>
  );
};


export default () => {
  return (
    <FormContext
      onSubmit={(v) => console.log(v)}
    >
      <ChildrenComponent />
    </FormContext>
  );
};
```
</details>

<details>
  <summary>With validation example</summary>
  
```jsx
import { FormContext, useField } from 'easy-ctx-form';

const Input = ({ name, value, type }) => {
  const { getInputProps, getMeta } = useField(name, { value, type });
  const { error, touched } = getMeta();
  return (
    <div>
      <input {...getInputProps()} />
      {touched && error && <span>{error}</span>}
    </div>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.check) {
    errors.check = 'Required';
  }

  return errors;
};

export default () => {
  return (
    <FormContext
      validate={validate}
      onSubmit={(v) => console.log(v)}
    >
      {(props) => (
        <>
          <Input name="email" type="email" />
          <Input name="password" type="password" />
          <Input name="check" type="checkbox" />
          <button type="submit" disabled={props.pristine}>
            submit
          </button>
        </>
      )}
    </FormContext>
  );
};
```
</details>

<details>
  <summary>With initial values example</summary>
  
```jsx
import { FormContext, useField } from 'easy-ctx-form';

const Input = ({ name, value, type }) => {
  const { getInputProps, getMeta } = useField(name, { value, type });
  const { error, touched } = getMeta();
  return (
    <div>
      <input {...getInputProps()} />
      {touched && error && <span>{error}</span>}
    </div>
  );
};

const initialValues = {
  email: 'test@test.com',
  password: 'qwerty'
};

export default () => {
  return (
    <FormContext
      initialValues={initialValues}
      onSubmit={(v) => console.log(v)}
    >
      {(props) => (
        <>
          <Input name="email" type="email" />
          <Input name="password" type="password" />
          <button type="submit" disabled={props.pristine}>
            submit
          </button>
        </>
      )}
    </FormContext>
  );
};
```
</details>

<details>
  <summary>With typescript usage</summary>

  All possible types you can find in library
  
```jsx
import { FormContext, useField } from 'easy-ctx-form';
import { TErrors, TValues, OutgoingProps } from 'easy-ctx-form/build/types/common';

const Input = ({ name, value, type }) => {
  const { getInputProps, getMeta } = useField(name, { value, type });
  const { error, touched } = getMeta();
  return (
    <div>
      <input {...getInputProps()} />
      {touched && error && <span>{error}</span>}
    </div>
  );
};

const validate = (values: TValues) => {
  const errors: TErrors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  return errors;
};


export default => {
  return (
    <FormContext
      onSubmit={(v) => console.log(v)}
      validate={validate}
      style={{ width: '100%' }}
    >
      {(props: OutgoingProps) => (
        <>
          <Input name="firstName" />
          <Input name="lastName" />
          <Input name="email" type="email" />
          <Input name="sex" type="radio" value="male" />
          <Input name="sex" type="radio" value="female" />
          <Input name="sex" type="radio" value="other" />
          <Select name="color" type="select" />
          <Input name="employed" type="checkbox" />
          <Input name="note" type="text-area" />
          <button type="submit" disabled={props.pristine}>
            submit
          </button>
        </>
      )}
    </FormContext>
  );
};
```
</details>

### FormContext props

1. `onSubmit` (required), function which will be get final object after success submit event
2. `validate`, function for validate form
3. `initialValues`, object for set initial values
4. `resetAfterSubmit`, boolean, automatically reset form after submit event (default false)
5. `debug`, boolean, debug mode for form state
6. rest of props will be set to `form` tag


### useField props

1. `fieldName` (required), unique field name
2. `options object`, you can pass type and value for input