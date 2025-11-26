import { useState, useEffect } from "react";

const TrafficLight = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lights = [
    { color: "red", time: 3000 },
    { color: "yellow", time: 1000 },
    { color: "green", time: 2000 },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Go to the next light; if we are already at the last light, restart from the first
      setActive(prev => {
        const next = prev + 1;
        return next >= lights.length ? 0 : next;
      });
    }, lights[active].time);

    return () => clearTimeout(timer);
    // Before the next effect runs, React cancels the previous timer → ensures only one timer exists at a time.
  }, [active, lights]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: 80 }}>
      {lights.map((light, index) => (
        <div
          key={light.color}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            margin: 8,
            backgroundColor: index === active ? light.color : "#ccc",
            transition: "0.3s",
          }}
        />
      ))}
    </div>
  );
};

export default TrafficLight;


/**
 * How this traffic light logic works (step-by-step):
 *
 * 1. We store the lights in an array, each with a color and duration.
 *      const lights = [{color, time}, ...]
 *
 * 2. `active` state keeps track of which light is currently ON (0 = first light).
 *
 * 3. useEffect runs on mount and every time `active` changes.
 *
 * 4. Inside useEffect we start a timer (setTimeout) based on the current light's duration.
 *      After the delay ends, we move to the next light:
 *      setActive(prev => {
        const next = prev + 1;
        return next >= lights.length ? 0 : next;
      });
 *      The sequence loop forever (e.g., 0→1→2→0→1→2…)
 *
 * 5. Before running the next effect, React calls the cleanup function which clears
 *      the previous timer. This avoids multiple overlapping timers and prevents
 *      state updates after unmount.
 *
 * 6. On each render, we map through the lights and highlight the one whose
 *      index matches `active`. Others remain gray.
 *
 * 7. Result: the lights switch automatically in a loop, using each light's duration.
 */