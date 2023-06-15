import React, { createRef, useCallback, useEffect, useRef } from "react";
import "./Select.scss";
import { useState } from "react";
import { isEmpty } from "@services/utils/Validations";
import { Validator } from "@services/utils/Validator";
import { Validations, PropsSelect } from "@packageTypes";
import times from "./times.svg";
import arrowDown from "./arrow-down.svg";

interface styleList {
  top?: string | number;
  maxHeight?: string | number;
  width?: string | number;
  height?: string | number;
}

const validate = new Validator();
export function Select(props: PropsSelect) {
  const {
    icon,
    placeholder = props.placeholder || "Seleccione opción",
    cols = "c-col-span-12",
    value,
    onChange,
    onRemove,
    name,
    validations,
    options,
    multiple = false,
    clearable = false,
    disabled = false,
    label = "name",
    trackBy = "id",
    repeatable = false,
    errors,
    title,
  } = props;

  const [localValue, setLocalValue] = useState("");

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setLocalValue(evt.target.value);
    filterOptions(localValue);
  };

  const [localOptions, setLocalOptions] = useState<Array<any>>([]);
  useEffect(() => {
    console.log({selectOptions: options})
    if (options) {
      setLocalOptions(options);
    }
  }, [options]);

  const filterOptions = (needle: string): void => {
    if (needle !== "") {
      const looking = localOptions.filter((val) => {
        if (typeof val === "number") {
          return val === Number(needle);
        } else if (typeof val === "string") {
          return val.toLowerCase().indexOf(needle) > -1;
        } else if (typeof val === "object") {
          return val[label].toLowerCase().indexOf(needle) > -1;
        }
      });
      if (!isEmpty(looking)) {
        setLocalOptions(looking);
      }
    }
  };

  useEffect(() => {
    if (localValue === "") {
      if (options) {
        setLocalOptions(options);
      }
    }
  }, [localValue]);

  const [showMenu, setShowMenu] = useState<Boolean>(false);
  const handleOnOpenCloseMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleOnOpenCloseFromInput = (
    event: React.MouseEvent<HTMLElement>
  ): void => {
    event.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const inputSelect: React.RefObject<HTMLInputElement> =
    createRef<HTMLInputElement>();
  const [touchedInputContainer, setTouchedInputContainer] =
    useState<Boolean>(false);
  const handleOnOpenCloseMenuFromContainer = (): void => {
    setShowMenu((prev) => !prev);
    setTouchedInputContainer((prev) => !prev);
  };

  const focusIntoInput = (): void => {
    if (inputSelect.current && showMenu) {
      inputSelect.current.focus();
    }
  };

  // make focus on the input when clicked container
  useEffect(() => {
    focusIntoInput();
  }, [touchedInputContainer]);

  let [positionListStyle, setPositionListStyle] = useState<styleList>({});
  let SelectMain: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement | null>(null);
  const SelectMenu: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement | null>(null);

  const calculateMenuPosition = (): void => {
    let pos: styleList = {};
    if (SelectMenu && SelectMenu.current && SelectMain && SelectMain.current) {
      const selectPosition = SelectMain.current.getBoundingClientRect();
      const realListPosition = Math.ceil(
        selectPosition.top - SelectMenu.current.clientHeight
      );
      const positionDownSelect = Math.ceil(
        selectPosition.top + selectPosition.height
      );
      if (selectPosition.top > 200) {
        if (SelectMenu.current.clientHeight > selectPosition.top) {
          pos.top = `${positionDownSelect}px`;
          pos.maxHeight = `${selectPosition.top}px`;
          pos.width = `${selectPosition.width}px`;
        } else {
          pos.top = `${realListPosition}px`;
          pos.maxHeight = `${
            selectPosition.top > 304 ? 304 : selectPosition.top
          }px`;
          pos.width = `${selectPosition.width}px`;
          pos.height = `${
            SelectMenu.current.clientHeight > 304 ? "304px" : "auto"
          }`;
        }
      } else if (selectPosition.bottom > 304) {
        pos.top = `${positionDownSelect}px`;
        pos.maxHeight = `304px`;
        pos.width = `${selectPosition.width}px`;
      } else if (selectPosition.bottom < 304 && selectPosition.top < 200) {
        pos.top = `${positionDownSelect}px`;
        pos.maxHeight = `304px`;
        pos.width = `${selectPosition.width}px`;
      } else {
        pos.top = `${realListPosition}px`;
        pos.maxHeight = `${selectPosition.top}px`;
        pos.width = `${selectPosition.width}px`;
      }
    }
    setPositionListStyle((prev) => ({ ...prev, ...pos }));
  };

  const handleClickOutside = useCallback((event: MouseEvent): void => {
    if (
      (event.target instanceof HTMLElement ||
        event.target instanceof SVGElement) &&
      !SelectMain.current?.contains(event.target)
    ) {
      setShowMenu(false);
    }
  }, []);

  const instanceClick = (): void => {
    if (showMenu) {
      window.addEventListener("click", handleClickOutside, true);
    } else {
      window.removeEventListener("click", handleClickOutside, true);
    }
  };

  useEffect(() => {
    calculateMenuPosition();
    instanceClick();
  }, [showMenu]);

  const handleOptionSelect = (option: object, index: number): void => {
    if (multiple) setMultipleOptions(option, index);
    else setSingleOption(option, index);
  };

  const setMultipleOptions = (option: object, index: number): void => {
    if (typeof value === "object" && Array.isArray(value)) {
      if (
        !repeatable &&
        !value.some((val) => val[trackBy] === option[trackBy as keyof object])
      ) {
        const mergedExternalValue = [...value, option];
        if (mergedExternalValue && onChange) {
          onChange({ value: mergedExternalValue, index });
          setLocalValue("");
          calculateMenuPosition();
          focusIntoInput();
          if (validations) {
            handleValidations(mergedExternalValue, validations);
          }
        }
      }
    }
  };

  const setSingleOption = (option: object, index: number) => {
    if (onChange) {
      onChange({ value: option, item: option, index });
      setLocalValue(option[label as keyof object]);
      if (validations) {
        handleValidations(option, validations);
      }
      setShowMenu(false);
    }
  };

  const removeMultipleOptions = (option: object, index: number): void => {
    if (typeof value === "object" && Array.isArray(value)) {
      const removedOption = value.filter(
        (val) => val[trackBy] !== option[trackBy as keyof object]
      );
      if (removedOption && onChange) {
        onChange({ value: removedOption, index });
        if (onRemove) {
          onRemove({ value: option, index });
        }
        focusIntoInput();
        if (validations) {
          handleValidations(removedOption, validations);
        }
      }
    }
  };

  const removeAll = (): void => {
    if (onChange && clearable) {
      if (multiple) {
        onChange({ value: [], index: null });
        if (onRemove) {
          onRemove({ value: [], index: null });
        }
        if (validations) {
          handleValidations([], validations);
        }
      } else {
        onChange({ value: {}, index: null });
        if (onRemove) {
          onRemove({ value: {}, index: null });
        }
        if (validations) {
          handleValidations({}, validations);
        }
      }
      setLocalValue("");
      setShowMenu(false);
    }
  };

  const handleValidations = (value: object, validations: Validations) => {
    validate.validate(value, validations);
    const hasErrors = validate.getErrors();
    if (!isEmpty(hasErrors)) {
      setLocalErrors(hasErrors);
    } else {
      setLocalErrors([]);
    }
  };

  useEffect(() => {
    if (
      multiple &&
      Array.isArray(value) &&
      value.length > 0 &&
      value.some((v) => typeof v === "number")
    ) {
      lookForObjectsByPropertiesArray(
        value.filter((v) => typeof v === "number")
      );
    } else if (
      !multiple &&
      !Array.isArray(value) &&
      typeof value === "number"
    ) {
      lookForObjectByValue(value);
    }
  }, []);
  const lookForObjectsByPropertiesArray = (ArrayProperties: Array<number>) => {
    // cuando seteamos como valor un array de ids. Ejemplo: Pais = { value : [1,2,3] }
    // buscamos los objetos en el listado de opciones para setear los objetos encontrados como valor
    if (options) {
      let val: Array<object> | Array<string> | object;
      const lookFor = options.filter((option) =>
        ArrayProperties.includes(option[trackBy])
      );
      val = [
        ...value.filter(
          (val: object | Array<number | string>) => typeof val !== "number"
        ),
        ...lookFor,
      ];
      if (onChange) {
        onChange({ value: val, index: null });
      }
      if (validations) {
        handleValidations(val, validations);
      }
    }
  };

  const lookForObjectByValue = (value: number | string) => {
    // cuando seteamos un numero como value. Ejemplo: Pais = { value : 1}
    if (options) {
      const lookFor = options.filter((option) => value === option[trackBy])[0];
      // emit("update:model-value", lookFor);
      if (onChange) {
        onChange({ value: lookFor, index: null });
      }
      if (validations) {
        handleValidations(lookFor, validations);
      }
    }
  };

  useEffect(() => {
    if (!multiple && value && !isEmpty(value)) {
      setLocalValue(value[label as keyof object]);
    }
    if (
      multiple &&
      Array.isArray(value) &&
      value.length > 0 &&
      value.some((v) => typeof v === "number")
    ) {
      lookForObjectsByPropertiesArray(
        value.filter((v) => typeof v === "number")
      );
    } else if (
      !multiple &&
      !Array.isArray(value) &&
      typeof value === "number"
    ) {
      lookForObjectByValue(value);
    }
  }, [value]);

  const [localErrors, setLocalErrors] = useState<Array<string>>([]);
  useEffect(() => {
    if (errors) {
      setLocalErrors(errors);
    }
  }, [errors]);

  return (
    <div ref={SelectMain} id={`${name}`} className={`Select_container ${cols}`}>
      {title && (
        <div className="label-container">
          <label className="label">{title}</label>
          {validations?.rules?.required && <span className="required">*</span>}
        </div>
      )}
      <div className="container">
        {icon && <img className="Select__icon" src={icon} />}
        <div className={`Select controlSelect `}>
          <div className={"Select__itemSelect"}>
            {
              // items multiples
              value && multiple && Array.isArray(value)
                ? value.map((val, index) => (
                    <div key={index} className="Select__itemSelect__multiValue">
                      <div className="Select__itemSelect__multiValue__label">
                        {val[label]}
                      </div>
                      <div
                        onClick={() => removeMultipleOptions(val, index)}
                        className="Select__itemSelect__multiValue__remove"
                      >
                        <img style={{ width: "9px" }} src={times} />
                      </div>
                    </div>
                  ))
                : // items normales
                  !multiple && (
                    <div className="Select__itemSelect__value">
                      <div className="Select__itemSelect__value__label">
                        <input
                          onClick={handleOnOpenCloseFromInput}
                          placeholder={placeholder}
                          autoComplete="off"
                          className="Select__itemSelect__inputContainer__input"
                          onChange={handleChange}
                          aria-expanded="true"
                          type="text"
                          value={localValue}
                        />
                      </div>
                    </div>
                  )
            }
            {
              // input buscador para los items multiple
              multiple && (
                <div
                  onClick={handleOnOpenCloseMenuFromContainer}
                  className="Select__itemSelect__inputContainer"
                  data-value={localValue}
                >
                  <input
                    style={{ width: !isEmpty(value) ? "100%" : "auto" }}
                    onClick={handleOnOpenCloseFromInput}
                    placeholder={!isEmpty(value) ? "" : placeholder}
                    autoComplete="off"
                    className="Select__itemSelect__inputContainer__input"
                    onChange={handleChange}
                    aria-expanded="true"
                    type="text"
                    ref={inputSelect}
                    value={localValue}
                  />
                </div>
              )
            }
          </div>
          <div className={"controlSelect"}>
            {
              // Limpiar items X
              clearable && value && !isEmpty(value) && (
                <div
                  onClick={removeAll}
                  className="controlSelect__indicatorContainer"
                >
                  <img style={{ width: "9px" }} src={times} />
                </div>
              )
            }
            <span className="controlSelect__indicatorSeparator"></span>
            <div
              onClick={handleOnOpenCloseMenu}
              className="controlSelect__indicatorContainer"
            >
              <img style={{ width: "9px" }} src={arrowDown} />
            </div>
          </div>
        </div>
      </div>
      {
        // mensajes de errores
        Array.isArray(localErrors) &&
          !isEmpty(localErrors) &&
          localErrors.map((error, key) => (
            <div key={key} className="controlSelect__text">
              {error}
            </div>
          ))
      }

      {
        // listado de items
        showMenu && (
          <div
            ref={SelectMenu}
            style={positionListStyle}
            className="Select__menu"
          >
            {localOptions.map((val, index) => (
              <div
                onClick={() => handleOptionSelect(val, index)}
                key={index}
                className={"Select__menu__itemContainer"}
              >
                <div className="Select__menu__itemContainer__item">
                  {val[label]}
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}
