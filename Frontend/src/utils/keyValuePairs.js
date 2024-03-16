const keyValuePairs = (object, propertyName) => {
  const keyValueObject = {};
  Object.entries(object).forEach(([key, entry]) => {
    // const property = object[key];
    keyValueObject[key] = entry[propertyName];
  });
  return keyValueObject;
};

export default keyValuePairs;
