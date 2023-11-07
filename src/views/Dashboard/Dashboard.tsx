import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  PicCenterOutlined,
  PropertySafetyOutlined,
  ShopOutlined,
  DollarOutlined,
  ApartmentOutlined,
  BankOutlined,
  SkinOutlined,
  UserSwitchOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Grid } from 'antd';
import { Router } from "../../router";
import { useNavigate, useLocation } from "react-router-dom"
import './Dashboard.scss'

const { Header, Sider, Content } = Layout;
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  resource?: any,
  children?: MenuItem[],
  type?: 'group',
  
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    resource
  } as MenuItem;
}


const Dashboard: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e : any) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    const currentX = e.touches[0].clientX;
    const distanceInPixels = Math.abs(currentX - startX);

    // Supongamos que 1 cm es aproximadamente igual a 37 píxeles (ajusta según tus necesidades)
    const cmToPixels = 37;
    const distanceInCm = distanceInPixels / cmToPixels;

    if (distanceInCm >= 2) {
      setCollapsed(true);
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuItem[] = [
    getItem('Home', '1', <HomeOutlined />, { path: '/' }),
    getItem('Contracts list', '2', <UnorderedListOutlined />, { path: '/list-contracts' }),
    getItem('Add Contract', '3', <FileAddOutlined />, { path: '/add-contract' }),
    getItem('Settings', 'sub1', <SettingOutlined />, {}, [
      getItem('Calibers', '5', <PicCenterOutlined />, { path: '/settings/calibers' }),
      getItem('Product Types', '6', <PropertySafetyOutlined />, { path: '/settings/categories' }),
      getItem('Companies', '7', <ShopOutlined />, { path: '/settings/companies' }),
      getItem('Currencies', '9', <DollarOutlined />, { path: '/settings/currencies' }),
      getItem('Packagings', '10', <ApartmentOutlined />, { path: '/settings/packagings' }),
      getItem('Payment Methods', '11', <BankOutlined />, { path: '/settings/paymentMethods' }),
      getItem('Products', '12',  <SkinOutlined />, { path: '/settings/products' }),
      getItem('Surveyors', '13', <UserSwitchOutlined />, { path: '/settings/surveyors' }),
      getItem('Users', '14', <UsergroupDeleteOutlined />, { path: '/settings/users' }),
    ]),
    getItem('Profile', '15', <UserOutlined />, { path: '/profile' }),
    getItem('Logout', '16', <LogoutOutlined />, { path: '/logout' }),
  ];



  const findMenuItem = (items: any, key: any) : any => {
    for (const item of items) {
      if (item.key === key) {
        return item;
      } else if (item.children) {
        const found = findMenuItem(item.children, key);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  
  const isMobile = () => !screens.sm

  const go = (menu : any) => {
    const { keyPath } = menu;
    const [key] = keyPath;
    const foundItem = findMenuItem(items, key);
    if(foundItem?.resource.path){
      navigate(foundItem.resource.path)
      if(isMobile() && !collapsed){
        setCollapsed(true)
      }
    }
  };

  useEffect(() => {
    if(isMobile() && !collapsed){
      setCollapsed(true)
    }
  }, [screens])

  const viewPdf = () => location.pathname.indexOf('/pdf/') > -1
  

  return (
    <Layout>
      {
        !viewPdf() && 
        <Sider 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        collapsedWidth={screens.sm ? 80 : 0}  
        trigger={null} 
        collapsible collapsed={collapsed} 
        style={{
          background: colorBgContainer,
          position: screens.xs ? 'fixed' : 'relative', // Posicionamiento fijo en dispositivos móviles
          height: screens.xs ? '100%' : 'auto', // Altura 100% en dispositivos móviles
          zIndex: 1000, // Asegura que esté por encima del contenido
        }}
        >
          <div className="demo-logo-vertical" />
            <div className="flex justify-center my-3">
              <img 
              className="max-w-full"
              src={"https://www.dimiproworld.com/wp-content/uploads/2018/10/adventure_logo_1-dimiopro.png"} 
              onClick={() => navigate("/")} />
            </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={(value: any) => go(value)}
            items={items}
          />
        </Sider>
      }
      <Layout
     
      >
        <Header style={{ display: 'flex', alignItems: 'center', padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
          <main className="AppMain__layer__PageAndTopBar">
              <div className="HomePageContent">
                <div
                  className="Scrollable--vertical
                HomePageContent__contentContainer"
                >
                  <Router />
                </div>
              </div>
          </main>
      </Layout>
    </Layout>
  );
};

export default Dashboard;