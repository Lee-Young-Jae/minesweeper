import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledCell = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid black;
`;

export { StyledContainer, StyledRow, StyledCell };
