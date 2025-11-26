import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { myDebounce, myThrottle } from './utils';
import ChildComponent from './child';
import WebSocket from './WebSocket';

// HOC to inject current time

import withCurrentTime from "./withCurrentTime";
import ShowTime from "./showTime";

const ShowTimeWithTime = withCurrentTime(ShowTime);

let countClick = 0;
const getData = () => {
  console.log('>>> countClick:', countClick++);
};

const debouncedFn = myDebounce(getData, 1000);
const throttleFn = myThrottle(getData, 1000);

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('>>>useCallback clicked');
    setCount(count => count + 1);
  }, []);

  const fnRef = useRef(handleClick);

  useEffect(() => {
    console.log("Function changed:", fnRef.current !== handleClick);
    fnRef.current = handleClick;
  });


  // Imagine this calculation is heavy.
  const expensiveValue = useMemo(() => {
    console.log('>>>Expensive calculation running...');
    let total = 0;
    for (let i = 0; i < 100000000; i++) {
      total += i;
    }
    return total;
  }, []); // it will only re-calculate once on mount

  return (
    <>
      <WebSocket />
      <br />
      <button onClick={() => setCount(count + 1)}>Parent Count: {count}</button>
      <br />
      <p>Expensive Value: {expensiveValue}</p>
      <br />
      <ChildComponent onClick={handleClick} value={{}} />
      <br />
      <ShowTimeWithTime name="Amol" />
      <br />
      <div>
        <h5>Debounce and Throttle Demo</h5>
        <button onClick={debouncedFn}>Debounce Button</button>
        <button onClick={throttleFn} style={{ marginLeft: 10 }}>
          Throttle Button
        </button>
        <p>Open console to see logs → countClick</p>
      </div>
      <br />
    </>
  );
};

export default ParentComponent;




// ✅ useCallback returns a memoized function.
// ✅ useMemo returns a memoized value.
// ✅ React.memo returns a memoized component.
// ✅ HOC ⇒ A function that takes a component and returns an enhanced component.

// useCallback ⇒ prevents re-creating functions on every render.
// useMemo ⇒ prevents re-computing expensive values on every render.
// React.memo ⇒ prevents a child component from re-rendering unless its props actually change.
//Higher-Order Components (HOCs) are functions that take a component and return a new component with enhanced behavior.
// React.memo is an example of an HOC that optimizes functional components by memoizing them.

// React.memo is a higher-order component that memoizes a functional component, preventing unnecessary re-renders when the props have not changed.
// By using React.memo, we can optimize functional components to avoid re-rendering when their props remain the same between renders.

//🧠 Analogy (simple way to remember)
//Think of React.PureComponent like React.memo for class components.
//👉 React.memo works for functional components.
//👉 PureComponent works for class components.


//"Throttle and debounce are performance optimization techniques used to limit how often a function is executed.

//Throttle ensures a function is called at most once every X ms, no matter how many times it’s triggered. I use it for things like window resize, scroll, or repeated button clicks — situations where I want consistent but limited execution.

//Debounce, on the other hand, ensures a function is called only after X ms of inactivity. It's great for auto-suggest inputs, search boxes, or form validations — where I want to wait until the user stops typing before firing the API.

//In summary, use throttle for consistent execution at intervals and debounce for delayed execution after inactivity. Both improve performance by reducing unnecessary function calls."

//🔥 In interviews, always say:
//"I use apply(this, args) to correctly forward the context (this) and arguments to the original function."


