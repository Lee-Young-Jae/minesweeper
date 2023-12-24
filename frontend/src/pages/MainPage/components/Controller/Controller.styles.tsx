import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.default};
  background-color: ${({ theme }) => theme.colors.default};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  max-width: 500px;
  margin: 1rem auto;
`;

const StyledGameInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.s};

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 700;
  }
`;

const StyledEmotion = styled.div`
  margin: 0 auto;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 100%;
`;

const StyledDifficulty = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > button {
    outline: none;
    border: none;
    cursor: pointer;
    /* background-color: ${({ theme }) => theme.colors.dark}; */
    background-color: #fff;
    color: #000;
    border-radius: ${({ theme }) => theme.borderRadius.s};
    padding: ${({ theme }) => theme.padding.s};
    width: 100%;
    margin-bottom: 0.5rem;
    font-size: 0.6rem;
    transition: 0.1s;
  }
`;

export { StyledContainer, StyledDifficulty, StyledGameInfo, StyledEmotion };
