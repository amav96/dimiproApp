import React, { createRef, useCallback, useEffect, useRef } from 'react'
import { PropsSelect } from '../../../types/Form'
import './Select.scss'
import { useState } from 'react'
import { isEmpty } from '../../../services/utils/Validations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Validator } from '../../../services/utils/Validator';
import { IValidations } from '../../../types/Validations';


interface styleList {
    top?: string | number
    maxHeight?: string | number
    width?: string | number
    height?: string | number
}

const validate =  new Validator();
export function Select(props: PropsSelect) {
    const {
        placeholder = 'Seleccione opción',
        cols =  'col-span-12',
        value,
        onChange,
        name,
        validations,
        options,
        multiple = false,
        clearable = false,
        disabled = false,
        label = 'name',
        trackBy = 'id',
        repeatable = false,
        errors
    } = props

    const [localValue, setLocalValue] = useState('')

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) :void => {
        setLocalValue(evt.target.value)
        filterOptions(localValue)
    }

    const [localOptions, setLocalOptions] = useState<Array<any>>([])
    useEffect(() => {
        if(options){
            setLocalOptions(options)
        }
    },[options])

    const filterOptions = (needle: string) :void => {
        if(needle !== ''){
            const looking = localOptions.filter((val) => {
                if(typeof val === 'number'){
                    return val === Number(needle)
                } else if (typeof val === 'string'){
                    return val.toLowerCase().indexOf(needle) > -1
                } else if (typeof val === 'object'){
                    return val[label].toLowerCase().indexOf(needle) > -1
                }
            })
            if(!isEmpty(looking)){
                setLocalOptions(looking)
            }
        }
    }

    useEffect(() => {
        if(localValue === ''){
            if(options){
                setLocalOptions(options)
            }
        }
    },[localValue])

    const [currentIndexHover, setCurrentIndexHover] = useState<number | null>(null)
    const setHoverItem = (index: number): void => {
        setCurrentIndexHover(index)
    }

    const [showMenu, setShowMenu] = useState<Boolean>(false)
    const handleOnOpenCloseMenu = () => {
        setShowMenu((prev) => !prev)
    }

    const handleOnOpenCloseFromInput = (event: React.MouseEvent<HTMLElement>) :void => {
        event.stopPropagation()
        setShowMenu((prev) => !prev)
    }

    const inputSelect: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
    const [touchedInputContainer, setTouchedInputContainer] = useState<Boolean>(false)
    const handleOnOpenCloseMenuFromContainer = () :void => {
        setShowMenu((prev) => !prev)
        setTouchedInputContainer((prev) => !prev)
    }

    const focusIntoInput = ():void => {
        if(inputSelect.current && showMenu){
            inputSelect.current.focus()
        }
    }

    // make focus on the input when clicked container
    useEffect(() => {
        focusIntoInput()
    }, [touchedInputContainer])

    let [positionListStyle, setPositionListStyle] = useState<styleList>({})
    let SelectMain: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement | null>(null);
    const SelectMenu: React.RefObject<HTMLDivElement>  = useRef<HTMLDivElement | null>(null);

    const calculateMenuPosition = () :void =>  {
        let pos: styleList = {}
        if ((SelectMenu && SelectMenu.current) && SelectMain && SelectMain.current) {
            const selectPosition = SelectMain.current.getBoundingClientRect();
            const realListPosition = Math.ceil(selectPosition.top - SelectMenu.current.clientHeight);
            const positionDownSelect = Math.ceil((selectPosition.top + selectPosition.height));
            if (selectPosition.top > 200) {
                if (SelectMenu.current.clientHeight > selectPosition.top) {
                    pos.top = `${positionDownSelect}px`;
                    pos.maxHeight = `${selectPosition.top}px`;
                    pos.width = `${selectPosition.width}px`;
                } else {
                    pos.top = `${realListPosition}px`;
                    pos.maxHeight = `${selectPosition.top > 304 ? 304 : selectPosition.top}px`;
                    pos.width = `${selectPosition.width}px`
                    pos.height = `${SelectMenu.current.clientHeight > 304 ? '304px' : 'auto'}`
                }
            } else if (selectPosition.bottom > 304) {
                pos.top = `${positionDownSelect}px`;
                pos.maxHeight = `304px`;
                pos.width = `${selectPosition.width}px`
            } else if (selectPosition.bottom < 304 && selectPosition.top < 200) {
                pos.top = `${positionDownSelect}px`;
                pos.maxHeight = `304px`;
                pos.width = `${selectPosition.width}px`
            } else {
                pos.top = `${realListPosition}px`;
                pos.maxHeight = `${selectPosition.top}px`;
                pos.width = `${selectPosition.width}px`
            }
        }
        setPositionListStyle((prev) => ({...prev, ...pos}))
    }

    const handleClickOutside = useCallback((event: MouseEvent) :void => {
        if (
            (event.target instanceof HTMLElement || event.target instanceof SVGElement) &&
            !SelectMain.current?.contains(event.target)) {
            setShowMenu(false);
        }
    }, [])

    const instanceClick = () :void => {
        if(showMenu){
            window.addEventListener('click', handleClickOutside, true);
        }else{
            window.removeEventListener('click', handleClickOutside, true);
        }
    }

    useEffect(() => {
        calculateMenuPosition()
        instanceClick()
    }, [showMenu])

    const handleOptionSelect = (option: object, index: number):void => {
        if(multiple) setMultipleOptions(option, index)
        else setSingleOption(option, index)
    }

    const setMultipleOptions = (option: object, index: number) :void => {
        if(typeof value === 'object' &&  Array.isArray(value)){
            if(!repeatable && !value.some((val) => val[trackBy] === option[trackBy as keyof object])){
                const mergedExternalValue = [...value, option];
                if(mergedExternalValue && onChange ){
                    onChange(mergedExternalValue, index)
                    setLocalValue('')
                    calculateMenuPosition()
                    focusIntoInput()
                    if(validations){
                        handleValidations(mergedExternalValue, validations);
                    }
                }
            }
        }
    }

    const setSingleOption = (option: object, index: number) => {
        if(onChange){
            onChange(option, index)
            setLocalValue(option[label as keyof object])
            if(validations){
                handleValidations(option, validations);
            }
            setShowMenu(false)
        }
    }

    const removeMultipleOptions = (option: object, index: number) :void => {
        if(typeof value === 'object' &&  Array.isArray(value)){
            const removedOption = value.filter((val,index) => val[trackBy] !== option[trackBy as keyof object])
            if(removedOption && onChange ){
                onChange(removedOption, index)
                focusIntoInput()
                if(validations){
                    handleValidations(removedOption, validations);
                }
            }
        }
    }

    const removeAll = () :void => {
        if(onChange){
            if(multiple){
                onChange([], 0)
                if(validations){
                    handleValidations([], validations);
                }
            }else {
                onChange({}, 0)
                if(validations){
                    handleValidations({}, validations);
                }
            }
            setLocalValue('')
        }
    }

    const handleValidations = (value: object, validations: IValidations) => {
        validate.validate(value, validations)
        const hasErrors = validate.getErrors
        if(!isEmpty(hasErrors)) {
            setLocalErrors(hasErrors)
        }else {
            setLocalErrors([])
        }
    }

    const isThereOption = (option: object, index: number) : boolean => {
        if(option && value && !isEmpty(value) && Array.isArray(value) &&
        value.some((val) => val[trackBy] === option[trackBy as keyof object])){
            return true
        }
        return false;
    }

    useEffect(() => {
        if(!multiple && value && !isEmpty(value)){
            setLocalValue(value[label as keyof object])
        }
    }, [value])

    const [localErrors, setLocalErrors] = useState<Array<string> | string>([])
    useEffect(() => {
        if(errors){
            setLocalErrors(errors)
        }
    }, [errors])

  return (
    <div ref={SelectMain} id={`${name}`} className={`Select_container ${cols}`}>
        <div  className={`Select controlSelect `}>
            <div className={'Select__itemSelect'} >
                {
                    // items multiples
                    value && multiple && Array.isArray(value)
                    ? value.map((val,index) => (
                        <div key={index} className='Select__itemSelect__multiValue'>
                            <div className='Select__itemSelect__multiValue__label' >
                                { val[label]}
                            </div>
                            <div
                            onClick={() => removeMultipleOptions(val,index)}
                            className='Select__itemSelect__multiValue__remove'>
                                <FontAwesomeIcon icon="times" />
                            </div>
                        </div>
                    ))
                    // items normales
                    : !multiple &&
                    (<div className='Select__itemSelect__value'>
                        <div className='Select__itemSelect__value__label' >
                            <input
                            onClick={handleOnOpenCloseFromInput}
                            placeholder={placeholder}
                            autoComplete="off"
                            className='Select__itemSelect__inputContainer__input'
                            onChange={handleChange}
                            aria-expanded="true"
                            type="text"
                            value={localValue}
                            />
                        </div>
                    </div>)
                }
                {
                    multiple &&
                    (<div
                        onClick={handleOnOpenCloseMenuFromContainer}
                        className='Select__itemSelect__inputContainer'
                        data-value={localValue}>
                            <input
                            style={{width: !isEmpty(value) ? '100%' : 'auto'}}
                            onClick={handleOnOpenCloseFromInput}
                            placeholder={!isEmpty(value) ? '' : placeholder}
                            autoComplete="off"
                            className='Select__itemSelect__inputContainer__input'
                            onChange={handleChange}
                            aria-expanded="true"
                            type="text"
                            ref={inputSelect}
                            value={localValue}
                            />
                    </div>)
                }
            </div>
            <div className={'controlSelect'}>
                {
                    value && !isEmpty(value) &&
                    (<div
                    onClick={removeAll}
                    className='controlSelect__indicatorContainer' >
                        <FontAwesomeIcon icon="times" />
                    </div>)
                }
                <span className='controlSelect__indicatorSeparator' ></span>
                <div
                onClick={handleOnOpenCloseMenu}
                className='controlSelect__indicatorContainer'>
                    <FontAwesomeIcon icon="arrow-down" />
                </div>
            </div>
        </div>
        {
            // mensajes de errores
            Array.isArray(localErrors) && !isEmpty(localErrors) &&
                localErrors.map((error,key) => (
                    <div key={key} className="controlSelect__text">
                        {error}
                    </div>
                )
            )
        }

        {
            // listado de items
            showMenu &&
            <div ref={SelectMenu} style={positionListStyle} className="Select__menu">
                {
                    localOptions.map((val, index) => (
                        <div
                        onMouseOver={() => setHoverItem(index)}
                        onClick={() => handleOptionSelect(val,index)}
                        key={index}
                        className=
                        {
                            `Select__menu__itemContainer
                            ${currentIndexHover === index ? 'bg-gray-300': ''}
                            ${isThereOption(val,index) ? 'font-bold' : ''}`
                        }>
                            <div className='Select__menu__itemContainer__item'>
                                {val[label]}
                            </div>
                        </div>
                    ))
                }
            </div>
        }
    </div>
  )
}

