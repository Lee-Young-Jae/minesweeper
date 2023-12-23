import React, { Dispatch, ReactNode, createContext, useState } from "react";
import Backdrop from "../../components/Dialog/backdrop";
import Loading from "../../components/layout/Loading";
import * as ReactDOM from "react-dom";

interface LayoutContextValue {
  dialog: ReactNode | null;
  setDialog: Dispatch<React.SetStateAction<ReactNode | null>>;
}

export const layoutContext = createContext<LayoutContextValue>({
  dialog: null as ReactNode | null,
  setDialog: () => {},
});

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [dialog, setDialog] = useState<ReactNode | null>(null);

  const contextValue = {
    dialog,
    setDialog,
  };

  return (
    <layoutContext.Provider value={contextValue}>
      {children}
    </layoutContext.Provider>
  );
};

export const DialogContainer = () => {
  return (
    <layoutContext.Consumer>
      {({ dialog }) => {
        return (
          dialog &&
          ReactDOM.createPortal(
            <Backdrop>{dialog}</Backdrop>,
            document.querySelector("#dialog") as HTMLElement
          )
        );
      }}
    </layoutContext.Consumer>
  );
};

export interface EnhancedLayoutProps {
  openDialog: (dialog: ReactNode) => void;
  closeDialog: () => void;
  dialog: ReactNode | null;
  startLoading: () => void;
  finishLoading: () => void;
}

export const withLayout = <P extends EnhancedLayoutProps>(
  Component: React.FC<P>
): React.FC<Omit<P, keyof EnhancedLayoutProps>> => {
  const WithLayout: React.FC<Omit<P, keyof EnhancedLayoutProps>> = (props) => {
    return (
      <layoutContext.Consumer>
        {({ setDialog, dialog }) => {
          const openDialog = setDialog;
          const closeDialog = () => setDialog(null);

          const startLoading = () => {
            openDialog(<Loading />);
          };

          const finishLoading = () => {
            closeDialog();
          };

          const enhancedProps = {
            openDialog,
            closeDialog,
            dialog,
            startLoading,
            finishLoading,
          };

          return <Component {...(props as P)} {...enhancedProps} />;
        }}
      </layoutContext.Consumer>
    );
  };

  WithLayout.displayName = `withLayout(${Component.displayName})`;
  return WithLayout;
};
