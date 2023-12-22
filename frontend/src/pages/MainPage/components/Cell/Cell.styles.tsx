import styled, { css } from "styled-components";

interface StyledCellProps {
  $isRevealed: boolean;
  $neighbour: number;
  $isFlag: boolean;
}

const StyledContainer = styled.div<StyledCellProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background-color: ${(props) => props.theme.colors.default};
  border: 1px solid ${(props) => props.theme.colors.light};
  width: 20px;
  height: 20px;

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

export { StyledContainer };
