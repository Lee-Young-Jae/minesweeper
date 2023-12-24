import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.s};
  border: 1px solid #fff;
  margin-bottom: 0.5rem;
  position: relative;
`;

const StyledInput = styled.input`
  height: 100%;
  border: none;
  background-color: transparent;
  width: 100%;

  text-align: center;
  font-size: 0.6rem;
  &:focus {
    outline: none;
  }
`;

const StyledLabel = styled.label`
  width: 10%;
  font-size: 0.6rem;
  text-align: center;
  padding: 0.2rem;
  position: absolute;
`;

export { StyledContainer, StyledInput, StyledLabel };
