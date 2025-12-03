import React, { useEffect, useState } from "react";

const styles = {
  container: { display: "flex", flexDirection: "column", alignItems: "center" },
  controls: { display: "flex", gap: 10, marginBottom: 14 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 80px)",
    gap: 10,
  },
  box: {
    width: 80,
    height: 80,
    border: "2px solid #333",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    background: "#e9e9e9",
    transition: "all 130ms",
    fontWeight: 500,
    userSelect: "none",
  },
  activeBox: {
    background: "#ffe899",
    borderColor: "#e7aa17",
    transform: "scale(1.05)",
  },
};

export default function SequenceBoxGame() {
  const [sequence, setSequence] = useState([]); // order of user clicked boxes
  const [currentIndex, setCurrentIndex] = useState(null); // index being highlighted during play

  const handleBoxClick = (boxIndex) => {
    setSequence((prev) => [...prev, boxIndex]); // store clicked order
  };

  const play = () => {
    if (sequence.length === 0) return; // no clicks stored
    setCurrentIndex(0);
  };


  const reset = () => {
    setSequence([]);
    setCurrentIndex(null)
  };

  useEffect(() => {
    if (currentIndex === null) return;

    let timer = setTimeout(() => {
      // if last item reached, stop
      if (currentIndex >= sequence.length - 1) {
        setCurrentIndex(null);
        // setCurrentIndex(null); // if want to play in a loop
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex, sequence]);

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <button onClick={play} disabled={sequence.length === 0}>
          Play
        </button>
        <button onClick={reset}>Reset</button>
      </div>

      <div style={styles.grid}>
        {[...Array(9)].map((_, index) => {
          return (
            <div
              key={index}
              style={sequence[currentIndex] === index ? { ...styles.box, ...styles.activeBox } : styles.box}
              onClick={() => handleBoxClick(index)}
            >
              {index + 1}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 10 }}>
        <strong>Sequence:</strong> {sequence.map((i) => i + 1).join(" → ")}
      </div>
    </div>
  );
}