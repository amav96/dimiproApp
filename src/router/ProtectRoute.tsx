import { useState, useEffect, useRef } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useNavigate } from "react-router-dom";


interface ProtectRouteProps {
  gate: string[] | string;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ gate }) => {

  const navigate = useNavigate()

  const { hasOrGetPermissions } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const hasAccess = useRef<boolean>(false)

  useEffect(() => {
    const checkPermissions = async () => {
      hasAccess.current = await hasOrGetPermissions(gate);
      if (hasAccess.current) {
        setIsLoaded(true);
      } else {
        navigate('/login')
        if(isLoaded){
          setIsLoaded(false);
        }
      }
    };

    checkPermissions();
  }, [hasOrGetPermissions, gate]);

  if (!isLoaded) {
    // Renderiza un componente de carga o una pantalla de espera mientras se verifica los permisos
    return null;
  }
  return hasAccess.current ? <Outlet /> : <Navigate to="/acceso-denegado" />;
};

export default ProtectRoute;