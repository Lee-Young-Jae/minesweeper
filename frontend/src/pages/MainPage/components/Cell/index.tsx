import React from "react";
import { StyledContainer } from "./Cell.styles";

interface CellProps {
  row: number;
  collumn: number;
  neighbour: number;
  isMine: boolean;
  isFlag: boolean;
  isRevealed: boolean;
  onClick: (x: number, y: number) => void;
  onRightClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    x: number,
    y: number
  ) => void;
}

const Cell = ({
  row,
  collumn,
  neighbour,
  isMine,
  isFlag,
  isRevealed,
  onClick,
  onRightClick,
}: CellProps) => {
  const handleLeftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    onClick(row, collumn);
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    onRightClick(e, row, collumn);
  };
  return (
    <StyledContainer
      $isFlag={isFlag}
      $isRevealed={isRevealed}
      $neighbour={neighbour}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      {isRevealed && !isMine && neighbour !== 0 ? neighbour : ""}
      {isRevealed && isMine ? "💣" : ""}
      {isFlag && !isRevealed ? "🚩" : ""}
    </StyledContainer>
  );
};

export default Cell;
