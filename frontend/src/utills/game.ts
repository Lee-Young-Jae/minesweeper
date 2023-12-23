import { GAME } from "./constance";

export const generateBoard = (
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

    // 초기 선택한 칸 주변 8칸에는 지뢰가 없다.
    const isInitialSelection = (x: number, y: number) => {
      for (let i = -1; i < 2; i++) {
        if (x + i < 0 || x + i >= row) continue;

        for (let j = -1; j < 2; j++) {
          if (y + j < 0 || y + j >= collumn) continue;

          if (x + i === initialSelection.x && y + j === initialSelection.y)
            return true;
        }
      }
      return false;
    };
    if (isInitialSelection(x, y) || board[x][y].isMine) continue;

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

  board = reveal(board, initialSelection.x, initialSelection.y);

  return { board, mineLocation };
};

export const reveal = (
  board: {
    x: number;
    y: number;
    isMine: boolean;
    isFlag: boolean;
    isRevealed: boolean;
    neighbour: number;
  }[][],
  row: number,
  collumn: number,
  callStackCount = 0
) => {
  callStackCount++;
  if (callStackCount > 7000) return board;

  if (board[row][collumn].isRevealed || board[row][collumn].isFlag)
    return board;
  board[row][collumn].isRevealed = true;

  if (board[row][collumn].neighbour === 0) {
    for (let i = -1; i < 2; i++) {
      if (row + i < 0 || row + i >= board.length) continue;

      for (let j = -1; j < 2; j++) {
        if (collumn + j < 0 || collumn + j >= board[0].length) continue;

        if (i === 0 && j === 0) continue;

        reveal(board, row + i, collumn + j, callStackCount);
      }
    }
  }

  return board;
};

export const flag = (
  board: {
    x: number;
    y: number;
    isMine: boolean;
    isFlag: boolean;
    isRevealed: boolean;
    neighbour: number;
  }[][],
  row: number,
  collumn: number
) => {
  if (board[row][collumn].isRevealed) return board;
  board[row][collumn].isFlag = !board[row][collumn].isFlag;

  return board;
};

export const checkWin = (
  board: {
    x: number;
    y: number;
    isMine: boolean;
    isFlag: boolean;
    isRevealed: boolean;
    neighbour: number;
  }[][],
  mineLocation: { x: number; y: number }[]
) => {
  let win = true;

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      // 지뢰가 아닌 칸이면서 아직 열리지 않은 칸이 있다면 게임은 아직 진행중이다.
      if (!board[x][y].isMine && !board[x][y].isRevealed) {
        win = false;
        break;
      }
    }
  }
  return win;
};

export const checkLose = (
  board: {
    x: number;
    y: number;
    isMine: boolean;
    isFlag: boolean;
    isRevealed: boolean;
    neighbour: number;
  }[][],
  row: number,
  collumn: number
) => {
  if (board[row][collumn].isMine) return true;
  let lose = false;

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y].isMine && board[x][y].isRevealed) {
        lose = true;
        break;
      }
    }
  }

  return lose;
};

export const explode = (
  board: {
    x: number;
    y: number;
    isMine: boolean;
    isFlag: boolean;
    isRevealed: boolean;
    neighbour: number;
  }[][],
  mineLocation: { x: number; y: number }[]
) => {
  for (let i = 0; i < mineLocation.length; i++) {
    board[mineLocation[i].x][mineLocation[i].y].isRevealed = true;
  }

  return board;
};

export const areaOpen = (
  board: {
    x: number;
    y: number;
    isMine: boolean;
    isFlag: boolean;
    isRevealed: boolean;
    neighbour: number;
  }[][],
  row: number,
  collumn: number
) => {
  let flagCount = 0;

  for (let i = -1; i < 2; i++) {
    if (row + i < 0 || row + i >= board.length) continue;

    for (let j = -1; j < 2; j++) {
      if (collumn + j < 0 || collumn + j >= board[0].length) continue;

      if (board[row + i][collumn + j].isFlag) flagCount++;
    }
  }

  if (flagCount !== board[row][collumn].neighbour) return board;

  for (let i = -1; i < 2; i++) {
    if (row + i < 0 || row + i >= board.length) continue;

    for (let j = -1; j < 2; j++) {
      if (collumn + j < 0 || collumn + j >= board[0].length) continue;

      if (i === 0 && j === 0) continue;

      reveal(board, row + i, collumn + j);
    }
  }

  return board;
};
