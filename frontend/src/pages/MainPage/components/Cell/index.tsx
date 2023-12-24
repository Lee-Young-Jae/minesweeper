import React from "react";
import { StyledContainer } from "./Cell.styles";
import { MOUSE_CLICK, GAME } from "../../../../utills/constance";

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
    if (e.buttons === MOUSE_CLICK.LEFT) onClick(row, collumn);
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (e.buttons === MOUSE_CLICK.RIGHT) onRightClick(e, row, collumn);
  };

  const handleDualClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.buttons === MOUSE_CLICK.DUAL) onDualClick(e, row, collumn);
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
      {isRevealed && isMine ? GAME.ICON.EXPLOSED_MINE : ""}
      {isFlag && !isRevealed ? GAME.ICON.FLAG : ""}
      {/* 개발모드 */}
      {/* {isMine ? GAME.ICON.MINE : ""} */}
    </StyledContainer>
  );
};

export default Cell;
