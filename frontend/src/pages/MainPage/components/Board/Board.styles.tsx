import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
  padding: ${(props) => {
    return props.theme.padding.l;
  }};

  border-radius: ${(props) => {
    return props.theme.borderRadius.s;
  }};

  background-color: ${(props) => {
    return props.theme.colors.light;
  }};
`;

const StyledTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: ${(props) => {
    return props.theme.fontSize.l;
  }};
  color: #fff;
  text-align: center;
`;

const StyledRow = styled.div`
  display: flex;
  width: 100%;
`;

interface StyledCellProps {
  $isRevealed: boolean;
  $neighbour: number;
  $isFlag: boolean;
}

const StyledCell = styled.div<StyledCellProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border: 1px solid black;
  border-radius: 2px;

  width: 20px;
  height: 20px;
  background-color: #eeeeee;
  opacity: 0.5;

  // isRevealed
  ${(props) =>
    props.$isRevealed &&
    css`
      background-color: #fff;
      opacity: 1;
      cursor: default;
      font-size: ${(props) => {
        return props.theme.fontSize.s;
      }};
    `}

  // neighbour
  color: ${(props) => {
    // 공개 되었을 때
    if (props.$isRevealed) {
      switch (props.$neighbour) {
        case 1:
          return props.theme.nearMineColors.one;
        case 2:
          return props.theme.nearMineColors.two;
        case 3:
          return props.theme.nearMineColors.three;
        case 4:
          return props.theme.nearMineColors.four;
        case 5:
          return props.theme.nearMineColors.five;
        case 6:
          return props.theme.nearMineColors.six;
        case 7:
          return props.theme.nearMineColors.seven;
        case 8:
          return props.theme.nearMineColors.eight;
        default:
          return "black";
      }
    } else {
      // return "transparent";
      return "black";
    }
  }};
`;

export { StyledContainer, StyledRow, StyledCell, StyledTitle };
