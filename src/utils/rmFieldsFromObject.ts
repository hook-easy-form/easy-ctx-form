export default (
  originalObject: Record<string, any>,
  fields: string[],
): Record<string, any> => {
  const newObject = { ...originalObject };

  fields.forEach((el) => {
    delete newObject[el];
  });

  return newObject;
};
