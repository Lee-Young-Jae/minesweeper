import { StyledContainer } from "./Timer.styles";
import useInterval from "../../../../hooks/useInterval";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";
import { setElapsedTime } from "../../../../redux/gameSlice";

const Timer = () => {
  const dispatch = useDispatch();
  const { isGaming, elapsedTime } = useSelector(
    (state: RootState) => state.game
  );

  useInterval(
    () => {
      dispatch(setElapsedTime(elapsedTime + 1));
    },
    isGaming ? 1000 : null
  );

  return <StyledContainer>{`🕒${elapsedTime}`}</StyledContainer>;
};

export default Timer;
