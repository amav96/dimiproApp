import { Route, Navigate, Outlet } from 'react-router-dom';

interface ProtectRouteProps {
    gate: string[] | string;
  }

const ProtectRoute: React.FC<ProtectRouteProps> = ({ gate }) => {
  const hasPermissions = true // aqui consulto la propiedad permissions del usuario y busco si tiene el permiso
  return (hasPermissions ? <Outlet/> : <Navigate to="/acceso-denegado" /> );
};

export default ProtectRoute;