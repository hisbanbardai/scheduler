import { useState } from "react";

export default function useVisualMode(initialMode) {
  // const [mode, setMode] = useState(initialMode);
  //we do not need to set state of mode separately because we can derive the mode from history array i.e. the last item in the history array which basically would be at the top of the stack because stack is LIFO
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {
    replace
      ? setHistory((prevMode) => [
          ...prevMode.slice(0, prevMode.length - 1),
          newMode,
        ])
      : setHistory((prevMode) => [...prevMode, newMode]);
  }

  function back() {
    if (history.length > 1)
      setHistory((prevMode) => prevMode.slice(0, prevMode.length - 1));
  }

  return {
    mode: history[history.length - 1],
    transition,
    back,
  };
}
