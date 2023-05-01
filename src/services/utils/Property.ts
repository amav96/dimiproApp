const getProperty = (obj: object, prop : string) => prop.split('.').reduce((object : any, manyKey : string) => {
  if (object[manyKey]) {
    return object[manyKey];
  }
  return '';
}, obj);

export default getProperty;
