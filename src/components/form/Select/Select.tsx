import React, { createRef, useCallback, useEffect, useRef } from 'react'
import { PropsSelect } from '../../../types/Form'
import './Select.scss'
import { useState } from 'react'
import { isEmpty } from '../../../utils/formValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


interface styleList {
    top?: string | number
    maxHeight?: string | number
    width?: string | number
    height?: string | number
}

export function Select(props: PropsSelect) {
    const {
        placeholder = 'Ingrese texto',
        cols =  'col-span-12',
        value,
        onChange,
        name,
        rules,
        options,
        multiselect = false,
        clearable = false,
        disabled = false,
        label = 'name',
        trackBy = 'id',
        repeatable = false
    } = props

    const [localValue, setLocalValue] = useState('')
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) :void => {
        setLocalValue(evt.target.value)
        filterOptions(localValue)
    }

    const [localOptions, setLocalOptions] = useState<Array<any>>([])
    useEffect(() => {
        setLocalOptions(options)
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
            setLocalOptions(options)
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
        if (event.target instanceof HTMLElement && !SelectMain.current?.contains(event.target)) {
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
        if(multiselect) setMultipleOptions(option, index)
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
                    if(multiselect){
                        focusIntoInput()
                    }
                }
            }
        }
    }

    const removeMultipleOptions = (option: object, index: number) :void => {
        if(typeof value === 'object' &&  Array.isArray(value)){
            const removedOption = value.filter((val,index) => val[trackBy] !== option[trackBy as keyof object])
            if(removedOption && onChange ){
                onChange(removedOption, index)
            }
        }
    }

    const setSingleOption = (option: object, index: number) => {

    }

    const isThereOption = (option: object, index: number) : boolean => {
        if(option && value && !isEmpty(value) && Array.isArray(value) &&
        value.some((val) => val[trackBy] === option[trackBy as keyof object])){
            return true
        }

        return false;
    }

  return (
    <div ref={SelectMain} className={`Select_container ${cols}`}>
        <div  className={`Select controlSelect `}>
            <div className={'Select__itemSelect'} >
                {
                    // items multiselects
                    value && multiselect && Array.isArray(value)
                    ? value.map((val,index) => (
                        <div key={index} className='Select__itemSelect__multiValue'>
                            <div className='Select__itemSelect__multiValue__label' > { val[label] } </div>
                            <div
                            onClick={() => removeMultipleOptions(val,index)}
                            className='Select__itemSelect__multiValue__remove'>x</div>
                        </div>
                    ))
                    // items normales
                    : (<div> Item normal </div>)
                }
                <div
                onClick={handleOnOpenCloseMenuFromContainer}
                className='Select__itemSelect__inputContainer'
                data-value={localValue}>
                    <input
                    onClick={handleOnOpenCloseFromInput}
                    className='Select__itemSelect__inputContainer__input'
                    onChange={handleChange}
                    aria-expanded="true"
                    type="text"
                    ref={inputSelect}
                    value={localValue}
                    />
                </div>
            </div>
            <div className={'controlSelect'}>
                <div className='controlSelect__indicatorContainer' >
                <FontAwesomeIcon icon="times" />
                
                </div>
                <span className='controlSelect__indicatorSeparator' ></span>
                <div
                onClick={handleOnOpenCloseMenu}
                className='controlSelect__indicatorContainer'>
                    <FontAwesomeIcon icon="arrow-down" />
                </div>
            </div>
        </div>
        {
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

