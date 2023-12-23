import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledSpinner = styled.div`
  animation: ${spin} 1s linear infinite;
  border: 4px solid ${(props) => props.theme.colors.default};
  border-left-color: transparent;
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

export { StyledContainer, StyledSpinner };
