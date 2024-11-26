// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { useState } from "react";

const WelcomePage = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleUnlock = () => {
    //@ts-ignore
    chrome.storage.sync.set({ encryptedPhrase: value }, () => {
      //@ts-ignore
      if (!chrome.runtime.lastError) {
        console.log("Encrypted phrase saved successfully.", value);
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="mt-6">
        <div className="mt-[10rem] mb-24 flex flex-col items-center gap-4">
          <div>
            <img src="/Images/logo.png" alt="logo" className="w-[16rem]" />
          </div>
          <p className="text-lg font-semibold uppercase">Welcome Back</p>
        </div>
        <div className="space-y-2">
          <label htmlFor="passphrase" className="text-neutral-400">
            Password
          </label>
          <input
            type="text"
            className="bg-transparent px-2 py-3 block w-full border border-accent/30 outline-none rounded-md"
            id="passphrase"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <Button className=" w-full py-3 mt-8" onClick={handleUnlock}>
          Unlock
        </Button>
      </div>
    </>
  );
};

export default WelcomePage;
