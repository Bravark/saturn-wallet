import { createContext, ReactNode, useContext, useState } from "react";
import MasterSmartWalletClass, { chain } from "../provider";

type ExtensionContextType = {
  generateNewSeed: () => string;
  encryptedPhrase: (
    seed: string,
    password: string
  ) => { [key: string]: string };
  decryptedPhrase: ({
    salt,
    password,
    encrypted,
  }: {
    salt: string;
    password: string;
    encrypted: string;
  }) => string | null;
  accountHandler: (phrase: string) => void;
  account: MasterSmartWalletClass | null;
};

const ExtensionContext = createContext<ExtensionContextType | null>(null);

// HDR: Extension Provider
const ExtensionContextProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<null | MasterSmartWalletClass>(null);

  //    SUB: Generate new seed
  const generateNewSeed = () => {
    const seed = MasterSmartWalletClass.GenerateNewSeed();
    return seed;
  };

  //    SUB: Encrypt phrase
  const encryptedPhrase = (seed: string, password: string) => {
    const encrypted = MasterSmartWalletClass.encryptSeedPhrase(seed, password);
    return encrypted;
  };

  //    SUB: Decrypt phrase
  const decryptedPhrase = ({
    password,
    salt,
    encrypted,
  }: {
    salt: string;
    password: string;
    encrypted: string;
  }) => {
    const decrypted = MasterSmartWalletClass.decryptSeedPhrase(
      encrypted,
      password,
      salt
    );

    return decrypted;
  };

  //    SUB: Get account
  const accountHandler = (phrase: string) => {
    console.log("From context", phrase);
    const acc = new MasterSmartWalletClass(phrase, chain);
    setAccount(acc);
  };

  const values = {
    generateNewSeed,
    encryptedPhrase,
    decryptedPhrase,
    account,
    accountHandler,
  };
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
