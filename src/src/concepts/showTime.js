// ShowTime.js
import React from "react";
function ShowTime({ name, currentTime }) {
  return (
    <div>
      <p>Hello {name}!</p>
      <p>Current time: {currentTime}</p>
    </div>
  );
}

export default ShowTime;

// 🟢 Purpose:
// This is a normal component that expects name and currentTime.
// But thanks to the HOC, it doesn’t need to know where currentTime came from.
//we can say ShowTime is Pure component which just displays what it gets via props.
//is this pure component because it does not manage any state or side effects on its own. It simply takes props and renders them.

// It relies on the HOC to provide the currentTime prop.

// In real-world apps, this pattern is useful for injecting data like theme, localization, or user info without cluttering the component logic.
