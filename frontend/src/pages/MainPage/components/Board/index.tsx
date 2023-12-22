import { StyledContainer, StyledCell, StyledRow } from "./Board.styles";
import { GAME } from "../../../../utills/constance/index";

const Board = () => {
  // TODO: 게임 보드를 구현한다.

  const generateBoard = (
    row: number,
    collumn: number,
    mineCount: number,
    initialSelection: { x: number; y: number }
  ) => {
    const { MAX_COL, MAX_ROW, MAX_MINE, MIN_COL, MIN_MINE, MIN_ROW } =
      GAME.GAME_RULES;

    if (row > MAX_ROW) row = MAX_ROW;
    if (collumn > MAX_COL) collumn = MAX_COL;
    if (mineCount > MAX_MINE) mineCount = MAX_MINE;
    if (row < MIN_ROW) row = MIN_ROW;
    if (collumn < MIN_COL) collumn = MIN_COL;
    if (mineCount < MIN_MINE) mineCount = MIN_MINE;
    if (mineCount > Math.floor((row * collumn) / 3))
      mineCount = Math.floor((row * collumn) / 3);

    let board = [];
    let mineLocation = [];

    for (let x = 0; x < row; x++) {
      let subCollumn = [];

      for (let y = 0; y < collumn; y++) {
        if (x === initialSelection.x && y === initialSelection.y) {
          subCollumn.push({
            x: x,
            y: y,
            isMine: false,
            isFlag: false,
            isRevealed: true,
            neighbour: 0,
          });
          continue;
        }

        subCollumn.push({
          x: x,
          y: y,
          isMine: false,
          isFlag: false,
          isRevealed: false,
          neighbour: 0,
        });
      }

      board.push(subCollumn);
    }

    // 지뢰를 랜덤하게 생성한다.
    while (mineCount > 0) {
      let x = Math.floor(Math.random() * row);
      let y = Math.floor(Math.random() * collumn);

      if (
        (x === initialSelection.x && y === initialSelection.y) ||
        board[x][y].isMine
      )
        continue;

      board[x][y].isMine = true;
      mineLocation.push({ x: x, y: y });
      mineCount--;
    }

    // 지뢰 주변 숫자를 표시한다.
    for (let x = 0; x < row; x++) {
      for (let y = 0; y < collumn; y++) {
        if (board[x][y].isMine) continue;

        let count = 0;

        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (x + i < 0 || x + i >= row || y + j < 0 || y + j >= collumn)
              continue;

            if (board[x + i][y + j].isMine) count++;
          }
        }

        board[x][y].neighbour = count;
      }
    }

    return { board, mineLocation };
  };

  return (
    <StyledContainer>
      <div>Board</div>
      {generateBoard(5, 5, 10, { x: 1, y: 1 }).board.map((row, index) => {
        return (
          <StyledRow key={index}>
            {row.map((cell, index) => {
              return (
                <StyledCell key={index}>
                  {cell.isMine ? "M" : cell.neighbour}
                  {cell.isRevealed ? "R" : ""}
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
