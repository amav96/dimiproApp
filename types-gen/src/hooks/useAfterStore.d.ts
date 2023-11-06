import { Dispatch } from 'redux';
/**
 * Hook personalizado para manejar la lógica después de almacenar datos.
 *
 * @param {Dispatch} dispatch - Función de despacho de Redux.
 * @param {Function} setFunction - Función para establecer el estado.
 * @param {any[]} items - Lista de elementos.
 * @returns {Function} - Función de devolución de llamada.
 */
export declare const useAfterStore: (dispatch: Dispatch, setFunction: Function, items: any[]) => (data: any) => void;
