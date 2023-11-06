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
export declare const useAfterUpdate: (dispatch: Dispatch, setFunction: Function, items: any[]) => (data: any) => void;
