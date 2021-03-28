import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { FormContext } from './context-form';

describe('Form Wrapper', () => {
  afterEach(cleanup);

  it('should return form', () => {
    render(
      <FormContext onSubmit={() => {}} debug>
        {() => <div />}
      </FormContext>,
    );
  });
});
