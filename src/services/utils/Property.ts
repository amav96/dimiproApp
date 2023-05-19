export const getProperty = (obj: object, prop : string) => prop.split('.').reduce((object : any, manyKey : string) => {
  if (object[manyKey]) {
    return object[manyKey];
  }
  return '';
}, obj);

export const removeDuplicates = (arr : any[], key? : string) : Promise<Array<any | string>> => new Promise((resolve) => {
  if(key){
    const remove = arr.filter((val, index, array) => array.findIndex((find) => find[key] === val[key]) === index);
    resolve(remove);
  } else {
    const remove = arr.filter((val, index, array) => array.findIndex((find) => find === val) === index);
    resolve(remove);
  }
  
});

