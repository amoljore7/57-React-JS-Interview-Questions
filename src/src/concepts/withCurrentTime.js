import React from "react";

//Higher-Order Components (HOCs) are functions that take a component and return a new component with enhanced behavior.
// React.memo is an example of an HOC that optimizes functional components by memoizing them.
function withCurrentTime(WrappedComponent) {
  return function WithCurrentTime(props) { // This is the new component
    const currentTime = new Date().toLocaleString();
    return (
      <WrappedComponent
        {...props}
        currentTime={currentTime} // Passes all original props plus currentTime
      />
    )
  };
}

export default withCurrentTime;

// 🟢 Key Idea:
// 	•	withCurrentTime wraps ShowTime.
// 	•	It adds a currentTime prop automatically.
// 	•	The original ShowTime remains unchanged.