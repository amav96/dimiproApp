import React, { useState } from 'react'
import { SideBarProps } from './SideBar.type'
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
      background = '#0162A0',
      colorScrollBar = '#0162A0',
      colorTextItem,
      menu,
    } = props;

  return (
    <div className="SidebarResizableContainer AppMain-sidebarResizableContainer">
        <div className="SidebarResizableContainer__sidebarWrapper">
          <style>
            {`
            .Sidebar__Above::-webkit-scrollbar-thumb {
              background: ${colorScrollBar};
            }
            .Sidebar__Top::-webkit-scrollbar-thumb {
              background: ${colorScrollBar};
            }
            `}
          </style>
            <div 
            onMouseOver={open}
            onMouseLeave={close}
            className="Sidebar SidebarResizableContainer__sidebar" style={{ backgroundColor: background }}>
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
