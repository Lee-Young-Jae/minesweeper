import { StyledContainer, StyledRow } from "./Board.styles";
import Cell from "../Cell";
import {
  generateEmptyBoard,
  generateBoard,
  reveal,
  flag,
  checkLose,
  checkWin,
  explode,
  areaOpen,
} from "../../../../utills/game";
import { useState } from "react";
import { withLayout, EnhancedLayoutProps } from "../../../../utills/lib/Layout";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setIsStarted, setEmotion } from "../../../../redux/gameSlice";
import { RootState } from "../../../../redux/rootReducer";
import { GAME } from "../../../../utills/constance";

const Board = ({
  startLoading,
  finishLoading,
  openDialog,
}: EnhancedLayoutProps) => {
  const { isStarted, difficulty } = useSelector(
    (state: RootState) => state.game
  );

  const [board, setBoard] = useState(
    generateEmptyBoard(difficulty.col, difficulty.row)
  );

  const dispatch = useDispatch();

  const win = () => {
    setEmotion(GAME.EMOTION.WIN);
    openDialog(<p>Game Win</p>);
  };

  const lose = () => {
    setBoard({ ...board, board: explode(board.board, board.mineLocation) });
    setEmotion(GAME.EMOTION.DEAD);
    openDialog(<p>Game Over</p>);
  };

  const handleCellClick = (x: number, y: number) => {
    if (!isStarted) {
      const newBoard = generateBoard(
        board.board,
        difficulty.row,
        difficulty.col,
        difficulty.mine,
        { x, y }
      );
      setBoard({
        ...board,
        board: newBoard.board,
        mineLocation: newBoard.mineLocation,
      });
      dispatch(setIsStarted(true));

      return;
    }
    if (board.board[x][y].isFlag || board.board[x][y].isRevealed) return;

    startLoading();
    if (checkLose(board.board, x, y)) {
      // TODO: 게임 오버 처리
      lose();
      return;
    }

    const newBoard = reveal(board.board, x, y);
    if (checkWin(board.board, board.mineLocation)) {
      // TODO: 게임 승리 처리
      win();
      return;
    }
    finishLoading();
    setBoard({ ...board, board: newBoard });
  };

  const handleCellRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number
  ) => {
    e.preventDefault();
    if (board.board[x][y].isRevealed) return;

    const newBoard = flag(board.board, x, y);
    if (checkWin(board.board, board.mineLocation)) {
      // TODO: 게임 승리 처리
      win();
      return;
    }
    setBoard({ ...board, board: newBoard });
  };

  const handleCellDualClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number
  ) => {
    e.preventDefault();
    const newBoard = areaOpen(board.board, x, y);
    if (checkLose(board.board, x, y)) {
      // TODO: 게임 오버 처리
      lose();
      return;
    }

    if (checkWin(board.board, board.mineLocation)) {
      // TODO: 게임 승리 처리
      win();
      return;
    }
    setBoard({ ...board, board: newBoard });
  };

  return (
    <StyledContainer>
      {board.board.map((row, index) => {
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
