type typeOfValueTypes = "string" | "number" | "object" 

export const isTypeValue = (value: string | number | object, type : typeOfValueTypes): boolean => {
    return typeof value === type;
};

export const isEmpty = (value: any) : boolean => { // Return true if condition succed
  if(value === null || value === undefined) return true
  if(value instanceof Date)return false

  switch(typeof value){
    case "string":
        return !value || value.length === 0;
    case "number":
        return !value;
    case "object":
        if(Array.isArray(value)) return value.length === 0
        else return Object.keys(value).length === 0
    default:
        return true;  
  }
};

export const isDate = (date: string): boolean => Boolean(Date.parse(date));

export const minLength = (value: string, min: number): boolean => !isEmpty(value) && value.length >= min; // Return true if condition succed
export const maxLength = (value: string, max: number): boolean =>  value.length <= max;

export const isEmail = (value: string): boolean =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    value
  );

export const contain = (originalValue: any,values: Array<string | number>) : boolean => {
  return originalValue && values.includes(originalValue);
};
