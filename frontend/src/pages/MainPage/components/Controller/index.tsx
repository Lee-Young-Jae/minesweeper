import { useSelector, useDispatch } from "react-redux";
import { withLayout, EnhancedLayoutProps } from "../../../../utills/lib/Layout";
import Timer from "../Timer";
import {
  StyledContainer,
  StyledDifficulty,
  StyledGameInfo,
  StyledEmotion,
} from "./Controller.styles";
import { RootState } from "../../../../redux/rootReducer";
import { resetGame, setDifficulty } from "../../../../redux/gameSlice";
import Input from "../../../../components/Input";
import { useState } from "react";
import { GAME } from "../../../../utills/constance";
import Button from "../../../../components/Button";

const MineCounter = () => {
  const { mineCount } = useSelector((state: RootState) => state.game);
  return <div>💣X{mineCount}</div>;
};

const Emotion = () => {
  const { emotion } = useSelector((state: RootState) => state.game);

  const dispatch = useDispatch();

  const resetGameHandler = () => {
    dispatch(resetGame());
  };
  return <StyledEmotion onClick={resetGameHandler}>{emotion}</StyledEmotion>;
};

const CustomDifficulty = () => {
  const [customDifficulty, setCustomDifficulty] = useState({
    row: 8,
    col: 8,
    mine: 10,
  });
  const dispatch = useDispatch();

  const customDifficultyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCustomDifficulty((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const validate = () => {
    const { MAX_ROW, MAX_COL, MAX_MINE, MIN_COL, MIN_MINE, MIN_ROW } =
      GAME.GAME_RULES;
    const { row, col, mine } = customDifficulty;

    if (row > MAX_ROW || col > MAX_COL || mine > MAX_MINE) {
      alert("최대값을 초과하였습니다.");
      return false;
    }

    if (row < MIN_ROW || col < MIN_COL || mine < MIN_MINE) {
      alert("최소값보다 작습니다.");
      return false;
    }

    if (Math.floor(row * col * 0.3) < mine) {
      alert(`지뢰가 너무 많습니다.
      (최대 지뢰 개수는 ${Math.floor(row * col * 0.3)}개 입니다.)
      `);
      return false;
    }

    return true;
  };

  const handleCustomDifficulty = () => {
    if (validate()) {
      dispatch(
        setDifficulty({
          row: customDifficulty.row,
          col: customDifficulty.col,
          mine: customDifficulty.mine,
        })
      );
      dispatch(resetGame());
    }
  };

  return (
    <>
      <Input
        label="⬇"
        id="row"
        type="number"
        value={customDifficulty.row}
        max={100}
        min={4}
        name="row"
        onChange={customDifficultyHandler}
      />
      <Input
        label="➡"
        id="col"
        type="number"
        value={customDifficulty.col}
        max={100}
        min={4}
        name="col"
        onChange={customDifficultyHandler}
      />
      <Input
        label="💣"
        id="mine"
        type="number"
        value={customDifficulty.mine}
        name="mine"
        max={3333}
        min={1}
        onChange={customDifficultyHandler}
      />
      <Button onClick={handleCustomDifficulty}>OK</Button>
    </>
  );
};

const Controller = () => {
  const dispatch = useDispatch();
  const [isCustom, setIsCustom] = useState(false);

  const patchResetGame = (row: number, col: number, mine: number) => {
    dispatch(
      setDifficulty({
        row,
        col,
        mine,
      })
    );
    dispatch(resetGame());
  };

  return (
    <StyledContainer>
      <StyledGameInfo>
        <MineCounter />
        <Emotion />
        <Timer />
      </StyledGameInfo>
      <StyledDifficulty>
        <button
          onClick={() => {
            patchResetGame(8, 8, 10);
          }}
        >
          Beginner (8X8), 지뢰 10개
        </button>
        <button
          onClick={() => {
            patchResetGame(16, 16, 40);
          }}
        >
          Intermediate (16X16) 지뢰 40개
        </button>
        <button
          onClick={() => {
            patchResetGame(16, 32, 100);
          }}
        >
          Expert (32X16) 지뢰 100개
        </button>
        <button
          onClick={() => {
            setIsCustom((prev) => !prev);
          }}
        >
          Custom
        </button>
        {isCustom && <CustomDifficulty />}
      </StyledDifficulty>
    </StyledContainer>
  );
};

export default withLayout(Controller);
