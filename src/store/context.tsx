import { createContext, ReactNode, useContext } from "react";
import MasterSmartWalletClass from "../provider";

type ExtensionContextType = {
  generateNewSeed: () => string;
};

const ExtensionContext = createContext<ExtensionContextType | null>(null);

const ExtensionContextProvider = ({ children }: { children: ReactNode }) => {
  //    SUB: Generate new seed
  const generateNewSeed = () => {
    const seed = MasterSmartWalletClass.GenerateNewSeed();
    return seed;
  };

  const values = { generateNewSeed };

  return (
    <ExtensionContext.Provider value={values}>
      {children}
    </ExtensionContext.Provider>
  );
};

export const useExtension = () => {
  const context = useContext(ExtensionContext);
  if (!context) {
    throw new Error("useExtension must be used within a ExtensionProvider");
  }
  return context;
};

export default ExtensionContextProvider;
