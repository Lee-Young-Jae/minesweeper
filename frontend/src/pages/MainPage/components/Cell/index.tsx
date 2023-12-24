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
  onDualClick: (
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
  onDualClick,
}: CellProps) => {
  const handleLeftClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.buttons === 0) onClick(row, collumn);
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (e.buttons === 0) onRightClick(e, row, collumn);
  };

  const handleDualClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.buttons === 3) onDualClick(e, row, collumn);
  };

  return (
    <StyledContainer
      $isFlag={isFlag}
      $isRevealed={isRevealed}
      $neighbour={neighbour}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
      onMouseDown={handleDualClick}
    >
      {isRevealed && !isMine && neighbour !== 0 ? neighbour : ""}
      {isRevealed && isMine ? "💥" : ""}
      {isFlag && !isRevealed ? "🚩" : ""}
      {/* 개발모드 */}
      {isMine ? "💣" : ""}
    </StyledContainer>
  );
};

export default Cell;
