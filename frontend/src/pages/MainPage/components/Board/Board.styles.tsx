import styled from "styled-components";

const StyledContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
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

export { StyledContainer, StyledRow, StyledTitle };
