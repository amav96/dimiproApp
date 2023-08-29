import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';

/**
 * useHandleUpdate es un hook personalizado que maneja la actualización de los elementos.
 * 
 * @param {Dispatch} dispatch - La función de despacho de Redux.
 * @param {Function} setFunction - La función que establece el estado de los elementos.
 * @param {any[]} items - Los elementos actuales.
 * @return {Function} - Retorna una función callback que toma un objeto de datos como parámetro.
 * Si los datos contienen errores, muestra un toast de error.
 * Si no hay errores, despacha la función setFunction con los elementos actualizados y muestra un toast de éxito.
 */
export const useAfterUpdate = (dispatch: Dispatch, setFunction: Function, items: any[]) => {
  return useCallback((data: any) => {
    if (data.errors || data.error) {
      toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
        autoClose: 5000,
        theme: "colored",
      });
    } else {
      dispatch(
        setFunction(
          items.map((item: any) =>
            item._id === data._id ? { ...item, ...data } : item
          )
        )
      );
      toast(`Successfully saved`, {
        autoClose: 2000,
        theme: "dark",
      });
    }
  }, [dispatch, setFunction, items]);
}