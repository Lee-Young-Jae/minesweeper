import { StyledContainer, StyledRow } from "./Board.styles";
import Cell from "../Cell";
import {
  generateBoard,
  reveal,
  flag,
  checkLose,
  checkWin,
  explode,
  areaOpen,
} from "../../../../utills/game";
import { withLayout, EnhancedLayoutProps } from "../../../../utills/lib/Layout";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsGaming,
  setEmotion,
  setBoard,
  setMineCount,
  resetGame,
} from "../../../../redux/gameSlice";
import { RootState } from "../../../../redux/rootReducer";
import { GAME } from "../../../../utills/constance";
import Dialog from "../../../../components/Dialog";
import Button from "../../../../components/Button";

const Board = ({
  startLoading,
  finishLoading,
  openDialog,
  closeDialog,
}: EnhancedLayoutProps) => {
  const { isGaming, difficulty, board, elapsedTime } = useSelector(
    (state: RootState) => state.game
  );

  const dispatch = useDispatch();

  const win = () => {
    finishLoading();
    dispatch(setEmotion(GAME.EMOTION.WIN));
    openDialog(
      <Dialog
        header="✨Game Win"
        footer={
          <Button
            onClick={() => {
              dispatch(resetGame());
              closeDialog();
            }}
          >
            네, 좋아요
          </Button>
        }
      >
        <div>축하합니다.</div>
        <div>걸린 시간은 {elapsedTime}초 입니다.</div>
      </Dialog>
    );
  };

  const lose = () => {
    finishLoading();
    const newBoard = explode(board);
    dispatch(setBoard(newBoard));
    dispatch(setIsGaming(false));
    dispatch(setEmotion(GAME.EMOTION.DEAD));
    openDialog(
      <Dialog
        header="💣Game Over"
        footer={
          <Button
            onClick={() => {
              dispatch(resetGame());
              closeDialog();
            }}
          >
            다시 시작하기
          </Button>
        }
      >
        <div>지뢰를 밟았습니다.</div>
        <div>다시 시작하시겠습니까?</div>
      </Dialog>
    );
  };

  const start = (x: number, y: number) => {
    const newBoard = generateBoard(
      board,
      difficulty.row,
      difficulty.col,
      difficulty.mine,
      { x, y }
    );

    dispatch(setBoard(newBoard));
    dispatch(setIsGaming(true));
    dispatch(setEmotion(GAME.EMOTION.HAPPY));
    return;
  };

  const handleCellClick = (x: number, y: number) => {
    dispatch(setEmotion(GAME.EMOTION.HAPPY));
    if (board[x][y].isFlag || board[x][y].isRevealed) return;
    if (!isGaming) {
      start(x, y);
      return;
    }
    if (checkLose(board, x, y)) {
      lose();
      return;
    }

    startLoading();
    const _Board = board.map((row) => row.map((cell) => ({ ...cell })));
    const newBoard = reveal(_Board, x, y);
    finishLoading();
    dispatch(setBoard(newBoard));
    if (checkWin(newBoard)) {
      win();
      return;
    }
  };

  const handleCellRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number
  ) => {
    e.preventDefault();
    if (board[x][y].isRevealed) return;
    dispatch(setEmotion(GAME.EMOTION.SURPRISED));
    const newBoard = flag(board, x, y);
    dispatch(setBoard(newBoard));
    dispatch(setMineCount());
  };

  const handleCellDualClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number
  ) => {
    e.preventDefault();
    if (!board[x][y].isRevealed || board[x][y].isFlag) return;
    startLoading();
    const _Board = board.map((row) => row.map((cell) => ({ ...cell })));
    const newBoard = areaOpen(_Board, x, y);
    finishLoading();
    dispatch(setBoard(newBoard));
    if (checkLose(newBoard, x, y)) {
      lose();
      return;
    }

    if (checkWin(newBoard)) {
      win();
      return;
    }
  };

  return (
    <StyledContainer>
      {board.map((row, index) => {
        return (
          <StyledRow key={index}>
            {row.map((cell, index) => {
              return (
                <Cell
                  row={cell.x}
                  collumn={cell.y}
                  key={index}
                  neighbour={cell.neighbour}
                  isMine={cell.isMine}
                  isFlag={cell.isFlag}
                  isRevealed={cell.isRevealed}
                  onClick={handleCellClick}
                  onRightClick={handleCellRightClick}
                  onDualClick={handleCellDualClick}
                />
              );
            })}
          </StyledRow>
        );
      })}
    </StyledContainer>
  );
};

export default withLayout(Board);
