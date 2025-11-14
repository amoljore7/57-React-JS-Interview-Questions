import React from "react";

// created a function that takes another component (ShowTime) and returns a new one that injects extra data (currentTime).
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