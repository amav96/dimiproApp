export const isString = (value: string): boolean => {
    return typeof value === 'string'
}

export const isNumber = (value: number): boolean => {
  return typeof value === 'number'
}

export const isEmpty = (value: any): boolean => {
  return value == undefined || value === null || value === '' ||
  (value && typeof value !== 'number' && Object.keys(value).length === 0) ||
  (value  && typeof value !== 'number' && Array.isArray(value) && value.length === 0)
}

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

export const minLength = (value: string, min: number): boolean => {
  return !isEmpty(value) && value.length >= min
}
export const isEmail = (value: string): boolean => /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value)

export const contain = (originalValue: any, values: Array<string|number>): boolean => {
  return originalValue && values.includes(originalValue)
}

interface Validations  {
  required?: boolean,
  min?: number,
  contain?: Array<string|number>,
  email?: string,
  message?: string,
  string?: boolean,
  number?: boolean
}

let errors: Array<string> = []

export const validate = (value : any, rules: Object): void => {
  errors = []
  if(typeof rules === 'object' && rules !== null){
    let property: Validations = rules;
    let isRequired: boolean = property.hasOwnProperty('required');
    if(isRequired && isEmpty(value)){
      let message = property.hasOwnProperty('message') && property.message ? property.message  : `Es obligatorio`
      if(errors.length > 0){
        errors.push(message)
      }else{
        errors = [message];
      }
    }
    if(!isEmpty(value) && property.hasOwnProperty('string') && !isString(value)){
      let message = property.hasOwnProperty('message') && property.message  ? property.message  : `Este valor debe ser un string`
      if(errors.length > 0){
        errors.push(message)
      }else{
        errors = [message];
      }
    }
    if(!isEmpty(value) && property.hasOwnProperty('number') && !isNumber(value)){
      let message = property.hasOwnProperty('message') && property.message ? property.message  : `Este valor debe ser un numero`
      if(errors.length > 0){
        errors.push(message)
      }else{
        errors = [message];
      }
    }
    if (!isEmpty(value) && property.hasOwnProperty('min') && property.min && (!minLength(value, property.min))){
      let message = property.hasOwnProperty('message') && property.message ? property.message  : `Debe tener un largo mayor a ${property.min}`
      if(errors.length > 0){
        errors.push(message)
      }else{
        errors = [message];
      }
    }
    if(!isEmpty(value) && property.hasOwnProperty('contain') && property.contain && !isEmpty(value) && !contain(value, property.contain)){
      let message = property.hasOwnProperty('message') && property.message ? property.message  : `Contiene valores inválidos`
      if(errors.length > 0){
        errors.push(message)
      }else{
        errors = [message];
      }
    }
    if(!isEmpty(value) && property.hasOwnProperty('email') && property.email && !isEmpty(value) && !isEmail(value)){
      let message = property.hasOwnProperty('message') && property.message ? property.message  : `Email inválido`
      if(errors.length > 0){
        errors.push(message)
      }else{
        errors = [message];
      }
    }
  } else {
    throw Error('Params incorrect')
  }
}

export const validationErrors = (): Array<string> => {
  let copyErrors = errors
  errors = []
  return copyErrors
}
