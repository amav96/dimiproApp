import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';

/**
 * Hook personalizado para manejar la lógica después de almacenar datos.
 * 
 * @param {Dispatch} dispatch - Función de despacho de Redux.
 * @param {Function} setFunction - Función para establecer el estado.
 * @param {any[]} items - Lista de elementos.
 * @returns {Function} - Función de devolución de llamada.
 */
export const useAfterStore = (dispatch: Dispatch, setFunction: Function, items: any[]) => {
  return useCallback((data: any) => {
    // Si hay errores en los datos, muestra un mensaje de error.
    if (data.errors || data.error) {
      toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
        autoClose: 5000,
        theme: "colored",
      });
    } else {
      // Si hay elementos, despacha la función de establecimiento con los elementos y los datos.
      if (items.length > 0) {
        dispatch(setFunction([...items, ...[data]]));
      }
      // Muestra un mensaje de éxito.
      toast(`Successfully saved`, {
        autoClose: 2000,
        theme: "dark",
      });
    }
  }, [dispatch, setFunction, items]);
}