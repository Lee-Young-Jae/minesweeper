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
import { useState } from "react";
import { withLayout, EnhancedLayoutProps } from "../../../../utills/lib/Layout";

const Board = ({
  startLoading,
  finishLoading,
  openDialog,
}: EnhancedLayoutProps) => {
  const [board, setBoard] = useState(generateBoard(5, 5, 3, { x: 0, y: 0 }));

  const handleCellClick = (x: number, y: number) => {
    if (board.board[x][y].isFlag || board.board[x][y].isRevealed) return;

    startLoading();
    if (checkLose(board.board, x, y)) {
      // TODO: 게임 오버 처리
      const newBoard = explode(board.board, board.mineLocation);
      setBoard({ ...board, board: newBoard });
      openDialog(<p>Game Over</p>);
      return;
    }

    const newBoard = reveal(board.board, x, y);
    if (checkWin(board.board, board.mineLocation)) {
      // TODO: 게임 승리 처리
      openDialog(<p>Game Win</p>);
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
      openDialog(<p>Game Win</p>);
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
      const newBoard = explode(board.board, board.mineLocation);
      setBoard({ ...board, board: newBoard });
      openDialog(<p>Game Over</p>);
      return;
    }

    if (checkWin(board.board, board.mineLocation)) {
      // TODO: 게임 승리 처리
      openDialog(<p>Game Win</p>);
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
