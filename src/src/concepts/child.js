import {memo} from 'react';
import {isEqual} from 'lodash';

const ChildComponent = ({ onClick }) => {
  console.log('>>>Child rendered');
  return <button onClick={onClick}>Child Button</button>;
};

// export default memo(ChildComponent);

// even though the component is wrapped in React.memo, it can still re-render if the props change, and especially when arrays or objects are passed inline.
//example: value={{}} creates a new object on every render, causing ChildComponent to re-render each time.
// To prevent this, we can provide a custom comparison function to React.memo that does a deep comparison of props using lodash's isEqual.

export default memo(ChildComponent, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});


//The Virtual DOM is a JavaScript object that represents the structure of the actual DOM.
	// It’s just a plain JavaScript object describing elements and their hierarchy.
	// React uses it to figure out the minimal changes needed to update the real DOM efficiently.