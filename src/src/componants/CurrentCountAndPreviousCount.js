import { useEffect, useRef, useState } from "react";

// useRef stores values without causing re-renders.
// I store the previous count inside a ref and update it inside useEffect so every render gets the last committed value.

//useEffect does NOT run before the component returns JSX.
//It runs after the component renders on screen.
//The first render cannot return the updated previous value because useEffect runs after the first UI paint, not before.

function usePrevious(value) {
  const prevRef = useRef(null);

  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  return prevRef.current;
}


export default function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div style={{ fontSize: "18px" }}>
      <p>Current Count: {count}</p>
      <p>Previous Count: {prevCount ?? "—"}</p>

      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

//Output 

// Action              Current Count         Previous Count

// Initial                  0                   -
//After 1 click             1                   0
//After 2 click             2                   1
//After 3 click             3                   2



