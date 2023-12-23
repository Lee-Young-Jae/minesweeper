import React from "react";

interface DialogProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const Dialog = ({ header, footer, children }: DialogProps) => {
  return (
    <div>
      {header && <header>{header}</header>}
      <main>{children}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
};

export default Dialog;
