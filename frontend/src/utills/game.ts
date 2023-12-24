import { GAME } from "./constance";

export const generateEmptyBoard = (row: number, collumn: number) => {
  let board = [];

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

  return board;
};

export const generateBoard = (
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

  let newBoard = board.map(
    (row) => row.map((cell) => ({ ...cell })) // 깊은 복사를 사용하여 새로운 객체 생성
  );

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
    if (isInitialSelection(x, y) || newBoard[x][y].isMine) continue;

    newBoard[x][y].isMine = true;
    mineCount--;
  }

  // 지뢰 주변 숫자를 표시한다.
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < collumn; y++) {
      if (newBoard[x][y].isMine) continue;

      let count = 0;

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (x + i < 0 || x + i >= row || y + j < 0 || y + j >= collumn)
            continue;

          if (newBoard[x + i][y + j].isMine) count++;
        }
      }

      newBoard[x][y].neighbour = count;
    }
  }

  newBoard = reveal(newBoard, initialSelection.x, initialSelection.y);

  return newBoard;
};

/**
 * #주의 : 이 함수는 board를 직접 수정한다.
 * @param board : 깊은 복사된 board를 입력해주세요
 */

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
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  newBoard[row][collumn].isFlag = !newBoard[row][collumn].isFlag;

  return newBoard;
};

export const checkWin = (
  board: {
    x: number;
    y: number;
    isMine: boolean;
    isFlag: boolean;
    isRevealed: boolean;
    neighbour: number;
  }[][]
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
  }[][]
) => {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  for (let x = 0; x < newBoard.length; x++) {
    for (let y = 0; y < newBoard[0].length; y++) {
      if (newBoard[x][y].isMine) newBoard[x][y].isRevealed = true;
    }
  }

  return newBoard;
};

/**
 * #주의 : 이 함수는 board를 직접 수정한다.
 * @param board : 깊은 복사된 board를 입력해주세요
 */
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
