import React, { useEffect } from "react";

export default function Timer() {
  const [initialTime, setInitialTime] = React.useState(0);
  const [startTimer, setStartTimer] = React.useState(false);

  const handleOnClick = () => {
    setInitialTime(5);
    setStartTimer(true);
  };

  useEffect(() => {
    if (initialTime > 0) {
      setTimeout(() => {
        setInitialTime(initialTime - 1);
      }, 1000);
    }

    if (initialTime === 0 && startTimer) {
      setStartTimer(false);
    }
  }, [initialTime, startTimer]);

  return (
    <div>
      <button onClick={handleOnClick}>Start</button>
      <TimerItem initialTime={initialTime} />
    </div>
  );
}

const TimerItem = ({ initialTime }) => {
  return <div>CountDown: {initialTime}</div>;
};
