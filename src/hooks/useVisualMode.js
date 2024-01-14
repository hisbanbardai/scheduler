import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);

  function transition(newMode) {
    setMode(newMode);
  }

  return {
    //we can write only mode too instead of mode: mode because name of key and value is same
    mode,
    transition,
  };
}
