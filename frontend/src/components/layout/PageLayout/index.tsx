import { ReactNode } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: #ececec;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContent = styled.div`
  width: 95%;
  height: 90%;
  min-height: 100vh;
  max-width: 1200px;
  padding: 1rem;
  background-color: #fff;
  border-radius: ${({ theme }) => theme.borderRadius.s};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  position: relative;

  overflow: scroll;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 0.5rem;
  }

  &::-webkit-scrollbar {
    width: 0.1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
  }
`;

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <StyledContainer>
      <StyledContent>{children}</StyledContent>
    </StyledContainer>
  );
};

export default PageLayout;
