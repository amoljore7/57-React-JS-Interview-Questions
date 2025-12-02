import React, { useEffect, useRef, useState } from "react";

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

const BLINK_TIME = 1000;
const TOTAL_BOXES = 9;

export default function SequenceBoxGame() {
  const [sequence, setSequence] = useState([]); // order of user clicked boxes
  const [currentIndex, setCurrentIndex] = useState(null); // index being highlighted during play
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  const handleBoxClick = (boxIndex) => {
    if (isPlaying) return;                      // avoid clicks while playing
    setSequence((prev) => [...prev, boxIndex]); // store clicked order
  };

  const play = () => {
    if (sequence.length === 0) return; // no clicks stored
    setIsPlaying(true);
    setCurrentIndex(0);
  };

  const stop = () => {
    setIsPlaying(false);
    setCurrentIndex(null);
  };

  const reset = () => {
    stop();
    setSequence([]);
  };

  useEffect(() => {
    if (!isPlaying || currentIndex === null) return;

    timerRef.current = setTimeout(() => {
      // if last item reached, stop
      if (currentIndex >= sequence.length - 1) {
        setIsPlaying(false);
        setCurrentIndex(null);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, BLINK_TIME);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentIndex, sequence]);

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <button onClick={play} disabled={isPlaying || sequence.length === 0}>
          Play
        </button>
        <button onClick={stop} disabled={!isPlaying}>
          Stop
        </button>
        <button onClick={reset}>Reset</button>
      </div>

      <div style={styles.grid}>
        {[...Array(TOTAL_BOXES)].map((_, i) => {
          const isBlinking =
            isPlaying &&
            currentIndex !== null &&
            sequence[currentIndex] === i;

          return (
            <div
              key={i}
              style={isBlinking ? { ...styles.box, ...styles.activeBox } : styles.box}
              onClick={() => handleBoxClick(i)}
            >
              {i + 1}
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