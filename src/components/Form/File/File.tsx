import React, { useEffect, useRef, useState } from 'react'
import { AcceptTypes, PropsFile } from './File.type'
import { isEmpty } from '../../../services/utils/Validations';
import './File.scss'
import nubeFile from './nube-file.svg';
import { Validator } from '../../../services/utils/Validator';
import { Validations } from '../../../types/Validations';

export function File(props: PropsFile) {

  let {
      placeholder = 'Ingrese texto',
      cols =  'col-span-12',
      value,
      onChange,
      name,
      validations,
      disabled = false,
      errors,
      type,
      accept = [
          "application/vnd.ms-excel",
          "application/pdf",
          "image/png",
          "image/jpeg",
          "image/jpg",
      ],
      className = '',
      listenForm
  } = props;

  const [localErrors, setLocalErrors] = useState<Array<string>>([])
  const validate =  new Validator();

  const handleValidations = (value: Array<File>, validations: Validations) => {
    console.log('value ', value)
    validate.validate(value, validations)
    const hasErrors = validate.getErrors
    if(!isEmpty(hasErrors)) {
        setLocalErrors(hasErrors)
    }else {
        setLocalErrors([])
    }
}


  useEffect(() => {
    if(errors){
        let newMessages = [...localErrors,...errors]
        setLocalErrors([...new Set(newMessages)])
    }
  }, [errors])


  const localAccept = () :string => accept.join(",")

  const uploadFile = (evt: React.ChangeEvent<HTMLInputElement>) =>  {
    let el = evt.target as HTMLInputElement
    let files = el.files as unknown as Array<File>
    if (files.length > 0 && onChange) {
      onChange(allowedFiles(files))
    } else if(listenForm){
      listenForm(allowedFiles(files))
    }

    if(validations !== undefined){
      handleValidations(allowedFiles(files), validations);
    }

  }

  const dropFiles = (evt: React.DragEvent<HTMLDivElement>) =>  {
    evt.preventDefault();
    if (evt.dataTransfer?.files.length && onChange) {
      let files = evt.dataTransfer.files as unknown as Array<File>
      onChange(allowedFiles(files))
      if(validations !== undefined){
        handleValidations(value, validations);
      }
    }
  }

  const resetEvent = () =>  {
    if(onChange){
      onChange([])
    }
  }

  const inputFile = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if(!disabled){
        inputFile?.current?.click()
        if(inputFile){
            initialize()
        }
    }
  }

  const initialize = () => {
    document.body.onfocus = checkIt;
  }

  const checkIt = () => {
    // if(validations !== undefined){
    //   console.log('checkin')
    //   handleValidations(value, validations);
    // }
    document.body.onfocus = null;
  }

  const allowedFiles = (files: Array<File>) =>  [...files].filter((f) => accept.includes(f.type as AcceptTypes))

  return (
    <div className={`File ${cols}`}>
        <div
        className={`${className} cursor-pointer File__box
        ${isEmpty(localErrors) ? 'color-files-normal' : 'color-files-error'}`}
        >
          <div
          onDragOver={(evt: React.DragEvent<HTMLDivElement>) => evt.preventDefault()}
          onDragEnter={(evt: React.DragEvent<HTMLDivElement>) => evt.preventDefault()}
          onDrop={dropFiles}
          onClick={handleClick}
          >
            <div className="File__box__img">
                <img src={nubeFile} />
            </div>
            <div className="File__box__text">
            {
              !isEmpty(value) ?
              (<span> Archivos seleccionados </span>)
              :(
                <div className="text-center">
                 <span className={`${isEmpty(localErrors) ? 'text-primary' : 'text-danger'}`}>Selecciona</span> desde tu dispositivo
                </div>
              )
            }
            </div>
          </div>
          <input
          style={{display:'none'}}
          onClick={resetEvent}
          onChange={uploadFile}
          accept={localAccept()}
          multiple
          type="file"
          ref={inputFile}
          />
        </div>
        {
          // mostrar errores
          Array.isArray(localErrors) && !isEmpty(localErrors) &&
            localErrors.map((error,key) => (
                <div key={key} className="controlInput__text">
                    {error}
                </div>
                )
            )
        }
    </div>
  )
}

