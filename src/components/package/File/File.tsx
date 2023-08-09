import React, { useEffect, useRef, useState } from "react";
import { AcceptTypes, PropsFile, Validations } from "@packageTypes";
import { isEmpty } from "@services/utils/Validations";
import "./File.scss";
import nubeFile from "./nube-file.svg";
import { Validator } from "@services/utils/Validator";
import { removeDuplicates } from "@services/utils/Property";
import documentImage from './document.png'
import useFiles from "@hooks/useFiles";

export function File(props: PropsFile) {
  let {
    icon,
    placeholder = props.placeholder || "Seleccionar archivo",
    cols = "c-col-span-12",
    value,
    onChange,
    name,
    validations,
    disabled = false,
    errors,
    type,
    title,
    accept = [
      "application/vnd.ms-excel",
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ],
    className = "",
    listenForm,
    onRemove,
    displayImages = true,
    resetOnOpen = false
  } = props;

  const { allowedFiles, convertFileToRender } = useFiles();

  const [localErrors, setLocalErrors] = useState<Array<string>>([]);
  const validate = new Validator();

  const handleValidations = (value: Array<File>, validations: Validations) => {
    validate.validate(value, validations);
    const hasErrors = validate.getErrors();
    if (!isEmpty(hasErrors)) {
      setLocalErrors(hasErrors);
    } else {
      setLocalErrors([]);
    }
  };

  useEffect(() => {
    const handleErrors = async () => {
      if (errors) {
        let newMessages = await removeDuplicates(errors);
        setLocalErrors(newMessages);
      }
    };
    handleErrors();
  }, [errors]);

  const localAccept = (): string => accept.join(",");

  const [images, setImages] = useState<any>([]);
  const uploadFile = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let el = evt.target as HTMLInputElement;
    let files = el.files as unknown as Array<Object>
    let build : Array<any> = [];
    if (files.length > 0 && onChange) {
      setImages([])
      files = transformFiles(files)
      if(value && value.length > 0){
        build = [...value.value,...allowedFiles(files, accept)]
        onChange(allowedFiles(files, accept));
      } else {
        build = allowedFiles(files, accept)
        onChange(allowedFiles(files, accept));
      }
    } else if (listenForm) {
      setImages([])
      files = transformFiles(files)
      if(value && value.length > 0){
        build = [...value.value,...allowedFiles(files, accept)]
        listenForm(allowedFiles(files, accept));
      } else {
        build = allowedFiles(files, accept)
        listenForm(allowedFiles(files, accept));
      }
    }
  };

  const dropFiles = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    if (evt.dataTransfer?.files.length && onChange) {
      let files = transformFiles(evt.dataTransfer.files as unknown as Array<any>)
      setImages([])
      if(value && value.length > 0){
        onChange([...value,...allowedFiles(files, accept)]);
      } else {
        onChange(allowedFiles(value ? [...value, ...files] : files, accept));
      }
    }
  };

  const resetEvent = () => {
    if (onChange && resetOnOpen) {
      onChange([]);
      setImages([])
    }
  };

  const inputFile = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (!disabled) {
      inputFile?.current?.click();
      if (inputFile) {
        initialize();
      }
    }
  };

  const initialize = () => {
    document.body.onfocus = checkIt;
  };

  const checkIt = () => {
    document.body.onfocus = null;
  };

  const remove = (image: any, index: number) => {
    let reBuild = value.filter((_ : any,i: number) => i !== index)
    setImages([])
    if (onChange) {
      onChange(reBuild);
    }
    if(onRemove){
      onRemove({image, index});
    }

    if(reBuild.length === 0 && validations){
      handleValidations(getFiles(reBuild), validations)
    }
  };

  useEffect(() => {
    if(Array.isArray(value)){
      buildGallery(value.filter((v) => typeof v === 'object'))
    }
  }, [value])

  const buildGallery = async (files: any) => {
    // Aca contruyo las imagenes que seran rederizadas
    if(files && files.length > 0){
      for(let i = 0; i < files.length; i++) {
        const convertedImage = await convertFileToRender(files[i].image);
        setImages((prevImages : any) => [...prevImages, { ...files[i], image: convertedImage }]);
      }
    }
  }

  const transformFiles = (files: Array<any>) => {
    // debe retornar este objeto para poder dinamicamente mergear objetos dsps
    return files = Array.from(files).map((item) => {
         return {
           image: item
         }
      })
  }

  const getFiles = (files: Array<any>) => {
    return files.map((file) => file.image)
  }

 


  const tooltipsRef = useRef<any>([]);

const showTooltip = (index: number) => {
  const tooltip = tooltipsRef.current[index];
    if (tooltip) {
      tooltip.style.display = 'block';
    }
};

const hideTooltip = (index: number) => {
  const tooltip = tooltipsRef.current[index];
    if (tooltip) {
      tooltip.style.display = 'none';
    }
};

const renderToolTip = (image : any) => {
  if (image.image?.file?.name) {
    return image.image?.file?.name;
  }
  if (image.image?.url) {
    if (image.image?.url.indexOf('/')) {
      const divide = image.image?.url.split('/');
      return divide[divide.length - 1];
    } else {
      return image.image?.url;
    }
  }
  return 'image';
};


  return (
    <div className={`File ${cols}`}>
      <div className="label-container">
        {title && <label className="label">{title}</label>}
        {validations?.rules?.required && <span className="required">*</span>}
      </div>
      <div className="container c-cursor-pointer" onClick={handleClick}>
        {icon && <img src={icon} alt="icon" className="File__icon" />}
        <div
          className={`${className} c-cursor-pointer File__box
        ${isEmpty(localErrors) ? "color-files-normal" : "color-files-error"}`}
        >
          <div
            onDragOver={(evt: React.DragEvent<HTMLDivElement>) =>
              evt.preventDefault()
            }
            onDragEnter={(evt: React.DragEvent<HTMLDivElement>) =>
              evt.preventDefault()
            }
            onDrop={dropFiles}
            
          >
            <div className="File__box__img">
              <img src={nubeFile} />
            </div>
            <div className="File__box__text">
              {!isEmpty(value) && typeof value !== 'string' ? (
                <div className="text-center" >Archivos seleccionados</div>
              ) : (
                <div className="text-center">
                  <span
                    className={`${
                      isEmpty(localErrors) ? "text-primary" : "text-danger"
                    }`}
                  >
                    {placeholder}
                  </span>
                </div>
              )}
            </div>
          </div>
          <input
            style={{ display: "none" }}
            onClick={resetEvent}
            onChange={uploadFile}
            accept={localAccept()}
            multiple
            type="file"
            ref={inputFile}
          />
        </div>
      </div>
      {!isEmpty(images) && displayImages && (
        <div className="image-container">
          {images.map((item: any, index : number) => (
            <div key={index} className="image-container__box" onMouseOver={() => showTooltip(index)} onMouseOut={() => hideTooltip(index)}>
              <div className="image-container__box__remove" onClick={() => remove(item, index)}>
                x
              </div>
              <img src={item.image?.base64 ? item.image?.base64 : item.image?.url ? item.image?.url : documentImage} alt="Image" />
              <div className="c-tooltip" ref={(el) => (tooltipsRef.current[index] = el)}>
                {renderToolTip(item)}
              </div>
            </div>
          ))}
        </div>
      )}
      {
        // mostrar errores
        Array.isArray(localErrors) &&
          !isEmpty(localErrors) &&
          localErrors.map((error, key) => (
            <div key={key} className="controlInput__text">
              {error}
            </div>
          ))
      }
    </div>
  );
}
