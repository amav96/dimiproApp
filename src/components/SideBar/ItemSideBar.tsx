import React, { useState } from 'react'
import { ItemSideBarProps } from '../../types'
import { useNavigate } from 'react-router-dom';
import './SideBar.scss'

export function ItemSideBar(props: ItemSideBarProps) {

  const {
      title,
      name,
      path,
      redirect,
      image,
      deployed,
      colorTextItem,
      subSection
    } = props;
    const navigate = useNavigate();

    const styleToSection = () => {
        return {
            height: '55px'
        }
    }

    const styleDeployed = () => {
        return {
            width: !deployed ? '68px' : '138px',
            justifyContent: 'center'
        }
    }

    const [deployedSection, setDeployedSection] = useState<boolean>(false);

    const handleNavigation = () => {
        if(subSection){
            setDeployedSection((prev) => !prev)
        } else {
            if(redirect){
                alert('redireciono a otra web')
            } else if(name) {
                navigate(name)
            }  else if(path) {
                navigate(path)
            }
        }
    }

    const handleSubNavigation = (data: ItemSideBarProps) => {
        if(data.redirect){
            alert('redireciono a otra web')
        } else if(data.name) {
            navigate(data.name)
        }  else if(data.path) {
            navigate(data.path)
        }
    }

  return (
        <div
        style={styleDeployed()}
        className="SidebarResizableContainer__item"
        >
            <div
            className="SidebarResizableContainer__item__box"
            onClick={handleNavigation}
            >
                <div
                style={styleToSection()}
                className="SidebarResizableContainer__item__box__item">
                    <div className="SidebarResizableContainer__item__box__item__boxImg">
                        <img src={image} />
                    </div>
                    
                    {
                      deployed && (
                        <div
                        style={{
                            color: colorTextItem
                        }}
                        className="SidebarResizableContainer__item__box__item__title" >
                        { title }
                        </div>
                      )
                    }
                </div>
                {
                  deployedSection && deployed && subSection && (
                    <div className="subSectionContainer">
                      {
                        subSection.map((section, index) => (
                          <div
                          className="subSection"
                          key={index}
                          onClick={() => handleSubNavigation(section)}
                          >
                              <div className="subSection__title">
                                  { section.title }
                              </div>
                              {
                                section.image && (
                                  <div
                                  className="subSection__img">
                                      <img src={section.image}/>
                                  </div>
                                )
                              }
                          </div>
                        ))
                      }
                    </div>
                  )
                }
            </div>
        </div>
  )
}
