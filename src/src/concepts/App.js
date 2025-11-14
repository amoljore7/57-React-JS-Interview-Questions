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
  // const [count, setCount] = useState(0);

  // const handleClick = useCallback(() => {
  //   console.log('>>>useCallback clicked');
  //   setCount(count => count + 1);
  // }, []);

  // const fnRef = useRef(handleClick);

  // useEffect(() => {
  //   console.log("Function changed:", fnRef.current !== handleClick);
  //   fnRef.current = handleClick;
  // });


  // // Imagine this calculation is heavy.
  // const expensiveValue = useMemo(() => {
  //   console.log('>>>Expensive calculation running...');
  //   let total = 0;
  //   for (let i = 0; i < 100000000; i++) {
  //     total += i;
  //   }
  //   return total;
  // }, []); // it will only re-calculate once on mount

  return (
    <>
      {/* <WebSocket />
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
      <br /> */}
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


//Explain me bellow code
var length = 20
function count(){
  console.log('>>>Length of this is:', this?.length);
}
const data = [count, 'A', 101]
data[0]('Amoll');// it will print 3
data[0](); // it will print 3
const fn = data[0]; // store reference
fn(); // plain function call // it will print 20

//Output:
//3
//3
//20

//Explanation:
//1. In the first call data[0]('Amoll'), the function count is called as a method of the array data. Here, this refers to the data array, which has a length of 3 (the function itself, 'A', and 101). So it logs 3.
//2. In the second call data[0](), again count is called as a method of the data array. The this context is still the data array, so it again logs 3.
//3. In the third call fn(), count is called as a plain function without any object context. In this case, this refers to the global object (window in browsers). Since we have a global variable length set to 20, it logs 20.

//To summarize, the value of this depends on how the function is called:
//- As a method of an object (data array) ⇒ this refers to that object.
//- As a plain function ⇒ this refers to the global object.


//Predict the output of the following code:

for(var i=0;i<5;i++){
  setTimeout(function(){
    console.log(i);
  },i*1000);
}

//Output:
//5
//5
//5
//5
//5

//Explanation:
//The loop completes before any of the setTimeout callbacks execute. By the time the callbacks run, the value of i is 5. Since var is function-scoped, all callbacks reference the same i variable, which has the final value of 5 after the loop ends.

//To fix this and log 0, 1, 2, 3, 4 as intended, we can use let instead of var:

for(let i=0;i<5;i++){
  setTimeout(function(){
    console.log(i);
  },i*1000);
}

//Now, each iteration of the loop creates a new block-scoped variable i, so the callbacks capture the correct value.
//so each time i variable will create new reference in memory

//Output:
//0
//1
//2
//3
//4 (after respective delays) 

//if you want to use var, you can create new function and pass i variable as parameter, so it creates new scope for each iteration:

for(var i=0;i<5;i++){
  logValue(i);
}
function logValue(i){
  setTimeout(function(){
    console.log(i);
  },i*1000);
}
//This way, each call to logValue creates a new scope with its own i value.
//Output:
//0
//1
//2
//3
//4 (after respective delays)
//if we remove *1000 from setTimeout, all logs will happen almost instantly after the loop ends, still logging 0 to 4 in quick succession. 


//more same concept examples like above:
//  Predict the output of the following code:

console.log('Start');

setTimeout(function() {
  console.log('Timeout 1');
}, 0);

Promise.resolve().then(function() {
  console.log('Promise 1');
}).then(function() {
  console.log('Promise 2');
});

setTimeout(function() {
  console.log('Timeout 2');
}, 0);

console.log('End');

//Output:
//Start
//End
//Promise 1
//Promise 2
//Timeout 1
//Timeout 2

//Explanation:
//1. 'Start' is logged first.
//2. Two setTimeout callbacks are scheduled to run after 0ms.
//3. A resolved Promise schedules its then callbacks to run after the current call stack.
//4. 'End' is logged next.
//5. The Promise callbacks execute next, logging 'Promise 1' and then 'Promise 2'.
//6. Finally, the setTimeout callbacks execute, logging 'Timeout 1' and 'Timeout 2'.

//This demonstrates the event loop's prioritization of microtasks (Promises) over macrotasks (setTimeout).
//Promises always complete before any setTimeout callbacks, even with a 0ms delay. its has higher priority in the event loop.


