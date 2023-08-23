import { useState, useEffect, useRef } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import usePermissions from '@hooks/usePermissions';

interface ProtectRouteProps {
  gate: string[] | string;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ gate }) => {
  const { hasOrGetPermissions } = usePermissions();
  const [isLoaded, setIsLoaded] = useState(false);
  const hasAccess = useRef<boolean>(false)

  useEffect(() => {
    const checkPermissions = async () => {
      hasAccess.current = await hasOrGetPermissions(gate);
      if (hasAccess) {
        setIsLoaded(true);
      } else {
        if(isLoaded){
          setIsLoaded(false);
        }
      }
    };

    checkPermissions();
  }, [hasOrGetPermissions, gate]);

  if (!isLoaded) {
    // Renderiza un componente de carga o una pantalla de espera mientras se verifica los permisos
    return
  }
  return hasAccess.current ? <Outlet /> : <Navigate to="/acceso-denegado" />;
};

export default ProtectRoute;