import { useState } from "react";
import { StyledContainer } from "./Timer.styles";
import useInterval from "../../../../hooks/useInterval";

interface TimerProps {
  isStart?: boolean;
}

const Timer = ({ isStart }: TimerProps) => {
  const [time, setTime] = useState(0);

  useInterval(
    () => {
      setTime((prev) => prev + 1);
    },
    isStart ? 1000 : null
  );

  return <StyledContainer>{time}</StyledContainer>;
};

export default Timer;
