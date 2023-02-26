import React, { createRef, useCallback, useEffect, useRef } from 'react'
import { PropsSelect } from '../../../types/Form'
import './Select.scss'
import { useState } from 'react'
import { isEmpty } from '../../../utils/formValidation';

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
        trackBy = 'id'
    } = props

    const [localValue, setLocalValue] = useState('')
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(evt.target.value)
        filterOptions(localValue)
    }

    const [localOptions, setLocalOptions] = useState<Array<any>>([])
    useEffect(() => {
        setLocalOptions(options)
    },[options])

    const filterOptions = (needle: string) => {
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

    const handleOnOpenCloseFromInput = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setShowMenu((prev) => !prev)
    }

    const inputSelect: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
    const [touchedInputContainer, setTouchedInputContainer] = useState<Boolean>(false)
    const handleOnOpenCloseMenuFromContainer = () => {
        setShowMenu((prev) => !prev)
        setTouchedInputContainer((prev) => !prev)
    }

    // make focus on the input when clicked container
    useEffect(() => {
        if(inputSelect.current && showMenu){
            inputSelect.current.focus()
        }
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

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (event.target instanceof HTMLElement && !SelectMain.current?.contains(event.target)) {
            setShowMenu(false);
        }
    }, [])

    const instanceClick = () => {
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

  return (
    <div ref={SelectMain} className={`Select_container ${cols}`}>
        <div  className={`Select controlSelect `}>
            <div className={'Select__itemSelect'} >
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
                    />
                </div>
            </div>
            <div className={'controlSelect'}>
                <div className='controlSelect__indicatorContainer' > x </div>
                <span className='controlSelect__indicatorSeparator' ></span>
                <div
                onClick={handleOnOpenCloseMenu}
                className='controlSelect__indicatorContainer'> lis </div>
            </div>
        </div>
        {
          showMenu &&
            <div ref={SelectMenu} style={positionListStyle} className="Select_menu">
                {
                    localOptions.map((val, index) => (
                        <div 
                        onMouseOver={() => setHoverItem(index)}
                        key={index} 
                        className={
                        `Select_menu__itemContainer 
                        ${currentIndexHover === index ? 'bg-gray-300': ''}`
                        }>
                            <div className='Select_menu__itemContainer__item'>
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
