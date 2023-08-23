import React, { useEffect, useState } from "react";
import { SideBarProps } from "@packageTypes";
import { ItemSideBar } from "@package";
import "./SideBar.scss";

export function SideBar(props: SideBarProps) {

  const { colorTextItem, menu, getDeployed, externalDeployed  } = props;

  useEffect(() => {
    if(!externalDeployed){
      close()
    } else {
      open()
    }
  }, [externalDeployed])

  const [deployed, setDeployed] = useState<boolean>(false);

  const open = () => {
    if (!deployed) {
      setDeployed(true);
      if(getDeployed){
        getDeployed(true);
      }
    }
  };

  const close = () => {
    if (deployed) {
      setDeployed(false);
      if(getDeployed){
        getDeployed(false);
      }
    }
  };



  return (
    <div className={`SidebarResizableContainer ${!deployed ? 'show' : ''}`}>
      <div className="SidebarResizableContainer__sidebarWrapper">
        <div
          onMouseOver={open}
          onMouseLeave={close}
          className="Sidebar SidebarResizableContainer__sidebar"
        >
          <div className="Sidebar__Top">
            {menu &&
              menu.top &&
              menu.top.map((item, i) => (
                
                <ItemSideBar
                  key={i}
                  title={item.title}
                  image={item.image}
                  deployed={deployed}
                  colorTextItem={colorTextItem}
                  subSection={item.subSection}
                  name={item.name}
                  path={item.path}
                  onNavigate={item.onNavigate}
                />
              ))}
          </div>
          <div className="Sidebar__Above">
            {menu &&
              menu.above &&
              menu.above.map((item, i) => (
                <ItemSideBar
                  key={i}
                  title={item.title}
                  image={item.image}
                  deployed={deployed}
                  colorTextItem={colorTextItem}
                  name={item.name}
                  path={item.path}
                  onNavigate={item.onNavigate}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
