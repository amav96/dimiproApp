import { useCallback } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const useAfterDelete = (dispatch: Dispatch, setFunction: Function, items: any[]) => {
  return useCallback((data: any) => {
    if (data.errors || data.error) {
      toast.error(`${JSON.stringify(data.errors ?? data.error)}`, {
        autoClose: 5000,
        theme: "colored",
      });
    } else {
      const updatedItems = items.filter(item => item.id !== data.id);
      dispatch(setFunction(updatedItems));
      toast(`Successfully deleted`, {
        autoClose: 2000,
        theme: "dark",
      });
    }
  }, [dispatch, setFunction, items]);
}