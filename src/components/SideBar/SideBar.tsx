import React, { useState } from 'react'
import { SideBarProps } from '../../types'
import { ItemSideBar } from './ItemSideBar';
import './SideBar.scss'

export function SideBar(props: SideBarProps) {

    const [deployed, setDeployed] = useState<boolean>(false);
    const open = () => {
      if(!deployed){
        setDeployed(true)
      }
    }

    const close = () => {
      if(deployed){
        setDeployed(false)
      }
    }

    const {
      colorTextItem,
      menu,
    } = props;

  return (
    <div className="SidebarResizableContainer">
        <div className="SidebarResizableContainer__sidebarWrapper">
            <div 
            onMouseOver={open}
            onMouseLeave={close}
            className="Sidebar SidebarResizableContainer__sidebar">
                <div className="Sidebar__Top">
                  {
                    menu && menu.top && menu.top.map((item,i) => (
                      <ItemSideBar
                      key={i}
                      title={item.title}
                      image={item.image}
                      deployed={deployed}
                      colorTextItem={colorTextItem}
                      subSection={item.subSection}
                      name={item.name}
                      path={item.path}
                      />
                    ))
                  }
                </div>
                <div className="Sidebar__Above">
                  {
                    menu && menu.above && menu.above.map((item,i) => (
                      <ItemSideBar
                      key={i}
                      title={item.title}
                      image={item.image}
                      deployed={deployed}
                      colorTextItem={colorTextItem}
                      name={item.name}
                      path={item.path}
                      />
                    ))
                  }
                </div>
            </div>
        </div>
    </div>
  )
}
