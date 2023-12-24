import React from "react";
import {
  StyledContainer,
  StyledMain,
  StyledFooter,
  StyledHeader,
} from "./Dialog.styles";

interface DialogProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const Dialog = ({ header, footer, children }: DialogProps) => {
  return (
    <StyledContainer>
      {header && <StyledHeader>{header}</StyledHeader>}
      <StyledMain>{children}</StyledMain>
      {footer && <StyledFooter>{footer}</StyledFooter>}
    </StyledContainer>
  );
};

export default Dialog;
