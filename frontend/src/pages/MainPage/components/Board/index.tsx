import { StyledContainer, StyledRow } from "./Board.styles";
import Cell from "../Cell";
import { generateBoard, reveal } from "../../../../utills/game";
import { useState } from "react";

const Board = () => {
  const [board, setBoard] = useState(generateBoard(10, 10, 10, { x: 1, y: 1 }));
  const [gameOver, setGameOver] = useState(false);

  const handleCellClick = (x: number, y: number) => {
    if (board.board[x][y].isFlag || board.board[x][y].isRevealed) return;

    const newBoard = reveal(board.board, x, y);
    setBoard({ ...board, board: newBoard });
  };

  const handleCellRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number
  ) => {
    e.preventDefault();
    if (board.board[x][y].isRevealed) return;
    const newBoard = board.board.map((row) => {
      return row.map((cell) => {
        if (cell.x === x && cell.y === y) {
          return { ...cell, isFlag: !cell.isFlag };
        }
        return cell;
      });
    });
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
                />
              );
            })}
          </StyledRow>
        );
      })}
    </StyledContainer>
  );
};

export default Board;
