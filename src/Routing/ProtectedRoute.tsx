import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const [encryptedPhrase, setEncryptedPhrase] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    //@ts-ignore
    chrome.storage.sync.get("encryptedPhrase", (result) => {
      //@ts-ignore
      if (!chrome.runtime.lastError) {
        console.log(result.encryptedPhrase);
        setEncryptedPhrase(result.encryptedPhrase || null);
      }
    });
    //@ts-ignore
  }, []);

  console.log("Initialized", encryptedPhrase);

  if (encryptedPhrase === null)
    return <Navigate to="/welcome" state={{ from: location }} replace />;

  return encryptedPhrase ? (
    <Outlet />
  ) : (
    <Navigate to="/welcome" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
