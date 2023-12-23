import styled from "styled-components";

const StyledContainer = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`;

interface BackdropProps {
  children: React.ReactNode;
}

const Backdrop = ({ children }: BackdropProps) => {
  return <StyledContainer className="backdrop">{children}</StyledContainer>;
};

export default Backdrop;
