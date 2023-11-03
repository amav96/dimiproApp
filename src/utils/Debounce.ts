const debounce = (fn: any, delay: number = 0, immediate: boolean = false) => {
    let timeout: any;
    return (...args: any) => {
      if (immediate && !timeout) fn(...args);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  
  export default debounce;
  