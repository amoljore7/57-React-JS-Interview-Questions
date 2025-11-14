export const myDebounce = (fn, d) => {
    let timer = null;  // Stores the timeout reference

    return function (...args) {
      clearTimeout(timer); // Clears any previously set timeouts
  
      // Set a new timeout to execute `fn` after the delay `d`
      timer = setTimeout(() => {
        fn.apply(this, args); // Calls the original function
      }, d);  // `d` is the debounce delay in milliseconds
    };
  };
        


export const myThrottle = (fn, limit) => {
    let flag = true; // initially true, so the first call executes

    return function (...args) {
      if (flag) {
        fn.apply(this, args); // call the function
        flag = false;         // block further calls
        setTimeout(() => {
          flag = true;        // after limit ms, allow again
        }, limit);
      }
    };
  };