import React, { createContext, useState, useContext } from 'react';

interface MenuContextData {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}


const MenuContext = createContext<MenuContextData | undefined>(undefined);

export const MenuProvider = ({ children }: { children: React.ReactNode }) =>{
  const [showSidebar, setShowSidebar] = useState(true);

  const contextValue: MenuContextData = {
    showSidebar,
    setShowSidebar,
  };

  return (
    <MenuContext.Provider value={{showSidebar, setShowSidebar}}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenu debe ser utilizado dentro de un MenuProvider');
  }

  return context;
};
