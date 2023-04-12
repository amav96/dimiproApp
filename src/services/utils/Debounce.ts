const debounce = (fn: Function, delay: number = 0, immediate: boolean = false) => {
    let timeout: number;
    return (...args: any) => {
      if (immediate && !timeout) fn(...args);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  
  export default debounce;