import React, { useEffect, useState } from "react";
import "./App.css";

const notes = [
  "A3", "B3",
  "C4", "D4", "E4", "F4", "G4", "A4", "B4",
  "C5", "D5", "E5", "F5", "G5", "A5", "B5",
  "C6"
];

function randomColor() {
  const colors = ["#FF5733","#33FF57","#3357FF","#F033FF","#FFD733","#33FFF6"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function App() {
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  const playNote = (note, e) => {
    const audio = new Audio(`/sounds/${note}.mp3`);
    audio.currentTime = 0;
    audio.play();

    e.target.style.background = randomColor();
  };

  if (!isLandscape && window.innerWidth < 900) {
    return (
      <div className="rotate-warning">
        <h1>📱 Gira tu dispositivo</h1>
        <p>Este piano solo funciona en modo horizontal (landscape).</p>
      </div>
    );
  }

  return (
    <div className="piano">
     
      <div className="keys">
        {notes.map((note,index) => (
          <button
            key={index}
            className="key"
            onClick={(e) => playNote(note, e)}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
}
