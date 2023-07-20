import { useState, useEffect, useRef } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import usePermissions from '@hooks/usePermissions';
import { Loader } from '@package';

interface ProtectRouteProps {
  gate: string[] | string;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ gate }) => {
  const { hasPermissions } = usePermissions();
  const [isLoaded, setIsLoaded] = useState(false);
  const hasAccess = useRef<boolean>(false)

  useEffect(() => {
    const checkPermissions = async () => {
      hasAccess.current = await hasPermissions(gate);
      if (hasAccess) {
        setIsLoaded(true);
      } else {
        if(isLoaded){
          setIsLoaded(false);
        }
      }
    };

    checkPermissions();
  }, [hasPermissions, gate]);

  if (!isLoaded) {
    // Renderiza un componente de carga o una pantalla de espera mientras se verifica los permisos
    return (<Loader />);
  }
  
  return hasAccess.current ? <Outlet /> : <Navigate to="/acceso-denegado" />;
};

export default ProtectRoute;