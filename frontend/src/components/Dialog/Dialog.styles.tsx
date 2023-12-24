import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-flow: column;
  padding: ${(props) => props.theme.padding.m};
  position: relative;
  width: 300px;
  z-index: 1100;
`;

const StyledHeader = styled.header`
  font-size: 1.3rem;
  font-weight: 700;
  padding-bottom: 1rem;
`;

const StyledMain = styled.main`
  flex: 1;
  max-height: 200px;
  min-height: 40px;
  overflow-y: scroll;
`;

const StyledFooter = styled.footer`
  padding-top: 1rem;
`;

export { StyledContainer, StyledFooter, StyledHeader, StyledMain };
