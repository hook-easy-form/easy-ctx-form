import getCheckedProperty from './getCheckedProperty';

describe('getCheckedProperty()', () => {
  const payload = {
    currentValue: true,
    initialValue: false,
  };

  it('if type is checkbox', () => {
    expect(getCheckedProperty({ ...payload, type: 'checkbox' })).toBe(payload.currentValue);
  });

  it('if type is radio', () => {
    expect(getCheckedProperty({ ...payload, type: 'radio' })).toBe(false);
  });

  it('if type is undefined', () => {
    expect(getCheckedProperty(payload)).toBe(undefined);
  });
});
