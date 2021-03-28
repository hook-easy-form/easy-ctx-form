import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Form } from './form';

describe('Form Wrapper', () => {
  afterEach(cleanup);

  it('children is a function', () => {
    render(
      <Form>
        {() => <div />}
      </Form>,
    );
  });

  it('children is a common react component', () => {
    const Comp = () => <div />;
    render(
      <Form>
        <Comp />
      </Form>,
    );
  });
});
