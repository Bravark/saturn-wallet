import { createContext, ReactNode, useContext } from "react";
import MasterSmartWalletClass from "../provider";

type ExtensionContextType = {
  generateNewSeed: () => string;
  encryptedPhrase: (
    seed: string,
    password: string
  ) => { [key: string]: string };
};

const ExtensionContext = createContext<ExtensionContextType | null>(null);

// HDR: Extension Provider
const ExtensionContextProvider = ({ children }: { children: ReactNode }) => {
  //    SUB: Generate new seed
  const generateNewSeed = () => {
    const seed = MasterSmartWalletClass.GenerateNewSeed();
    return seed;
  };

  const encryptedPhrase = (seed: string, password: string) => {
    const encrypted = MasterSmartWalletClass.encryptSeedPhrase(seed, password);

    console.log(encrypted);

    return encrypted;
  };

  const values = { generateNewSeed, encryptedPhrase };
  // HDR: return Provider
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
