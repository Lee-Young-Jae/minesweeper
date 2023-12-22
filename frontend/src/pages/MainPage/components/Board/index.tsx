import { StyledContainer, StyledCell, StyledRow } from "./Board.styles";

import { generateBoard } from "../../../../utills/game";

const Board = () => {
  // TODO: 게임 보드를 구현한다.

  return (
    <StyledContainer>
      {generateBoard(10, 10, 10, { x: 1, y: 1 }).board.map((row, index) => {
        return (
          <StyledRow key={index}>
            {row.map((cell, index) => {
              return (
                <StyledCell
                  key={index}
                  $isRevealed={cell.isRevealed}
                  $neighbour={cell.neighbour}
                  $isFlag={cell.isFlag}
                >
                  {cell.isMine ? "💣" : ""}
                  {cell.isRevealed ? cell.neighbour : ""}
                </StyledCell>
              );
            })}
          </StyledRow>
        );
      })}
    </StyledContainer>
  );
};

export default Board;
