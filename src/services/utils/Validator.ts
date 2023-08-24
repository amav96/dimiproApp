import { Validations, Messages, Rules } from "@packageTypes";
import { isEmpty, minLength, contain, isEmail, isTypeValue, maxLength} from "./Validations";


export class Validator {
  errors: Array<string> = [];
  required: boolean = false;
  min: boolean = false;
  max : boolean = false;
  contain: boolean = false;
  email: boolean = false;
  message: boolean = false;
  string: boolean = false;
  number: boolean = false;

  public validate(value: any, validations: Validations): void {
    this.errors = []
    if (typeof validations === "object" && validations !== null) {
      const property: Rules = validations.rules;
      const messages: Messages | undefined = validations.messages;
      if (property.required && isEmpty(value)) {
          this.required = true
          let message = messages?.required ?? `Required field`;
          this.errors.push(message)
      } else if(property.required && !isEmpty(value) && this.required){
        // Se elimina el error generado en el if anterior, y se setea la variable en false
        // para no volver a entrar en este bloque de codigo
        this.required = false;
      }

      if (!isEmpty(value) && property.string && isTypeValue(value,"string")) {
          this.string = true
          let message =  messages?.string ?? `Este valor debe ser un string`;
          this.errors.push(message)
      } else if(!isEmpty(value) && property.string && isTypeValue(value, "string") && this.string){
        this.string = false
      }

      if (!isEmpty(value) && property.number  && !isTypeValue(value, "number")) {
          this.number = true
          let message = messages?.number ?? `Este valor debe ser un numero`;
          this.errors.push(message)
      } else if(!isEmpty(value) && property.number  && isTypeValue(value, "number") && this.number){
        this.number = false
      }

      if (!isEmpty(value) && property.min && !minLength(value, property.min)) {
        this.min = true
        let message = messages?.min ??  `Debe tener un largo mayor a ${property.min}`;
        this.errors.push(message)
      } else if(property.min && (minLength(value, property.min) || isEmpty(value)) && this.min){
        this.min = false
      }

      if  (!isEmpty(value) && property.max && !maxLength(value, property.max)) {
        this.max = true
        let message = messages?.max ?? `Debe tener un largo menor a ${property.max}`;
        this.errors.push(message)
      } else if(property.max && (maxLength(value, property.max) || isEmpty(value)) && this.max){
        this.max = false
      }

      if (!isEmpty(value) && property.contain && !contain(value, property.contain)) {
          this.contain = true
          let message = messages?.contain ?? `Contiene valores inválidos`;
          this.errors.push(message)
      } else if(!isEmpty(value) && property.contain && contain(value, property.contain) && this.contain){
        this.contain = false
      }

      if (!isEmpty(value) && property.email && !isEmail(value)) {
          this.email = true
          let message = messages?.email ?? `Email inválido`;
          this.errors.push(message)
      }else if(!isEmpty(value) && property.email && isEmail(value) && this.email){
        this.email = false
      }

    } else {
      throw Error("Params incorrect");
    }
  }
  public getErrors(): Array<string> {
    return this.errors;
  }
} 