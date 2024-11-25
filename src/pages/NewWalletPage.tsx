import { IoCopySharp, IoStar } from "react-icons/io5";
import BackButton from "../components/UI/BackButton";
import Button from "../components/UI/Button";
import { FcGoogle } from "react-icons/fc";
import { MasterSmartWalletClass } from "../../public/provider";
import { useCallback, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

const NewWalletPage = () => {
  const [phrases, setPhrases] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [steps, setSteps] = useState(0);

  //  const handleLogin = () => {
  //     chrome.runtime.sendMessage({ type: "login" });

  //   };

  const handleLogin = () => {
    //@ts-ignore
    chrome.storage.sync.set({ loggedIn: true }, () => {
      //@ts-ignore
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab) {
          //@ts-ignore
          chrome.tabs.update(currentTab.id!, {
            //@ts-ignore
            url: chrome.runtime.getURL("index.html"),
          });
        }
      });
    });
  };

  // HDR: Create a new pass phrase
  const handleCreateNewPhrase = () => {
    const seed = MasterSmartWalletClass.GenerateNewSeed();
    setPhrases(seed);
    setSteps(1);
  };

  // HDR: TIMER TO CLOSE TOOLTIP
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    () => clearTimeout(timer);
  }, [showTooltip]);

  // HDR: COPY TEXT
  const copyLink = useCallback((wallet: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(wallet);
      setShowTooltip(true);
    }
  }, []);

  return (
    <div>
      {steps === 0 && (
        <div className="grid grid-cols-4 items-center ">
          <div>
            <BackButton />
          </div>
          <h3 className="col-span-3 text-xl capitalize">Create new wallet</h3>
        </div>
      )}
      {steps > 0 && (
        <div className="grid grid-cols-4 items-center ">
          <button
            className="flex items-center gap-1"
            onClick={() => setSteps((prev) => --prev)}
          >
            {" "}
            <IoMdArrowBack className="size-5" /> <span>Go back</span>
          </button>
        </div>
      )}
      {steps === 0 && (
        <div className="mt-6">
          <p className="text-center  mb-4 text-sm">
            Select the way you want to create your wallet
          </p>

          {/* SUB: ======== *** ========== */}
          <div className="bg-neutral-800 rounded-md px-6 py-8">
            <h2>Use Recovery Phrase</h2>
            <h4 className="text-sm mb-8 mt-4">
              Maximum control & high compatibility wallet
            </h4>
            <div className="flex items-center gap-1">
              <IoStar size={18} className="text-accent" />
              <IoStar size={18} className="text-accent" />
              <IoStar size={18} className="text-accent" />
              <p className="text-sm">Higher security</p>
            </div>

            <Button
              className="w-full block  mt-4 mb-6"
              onClick={handleCreateNewPhrase}
            >
              Create New Recovery Phrase
            </Button>

            {/* <p className="text-center capitalize text-sm">
          import existing recovery phrase
        </p> */}
          </div>

          {/* SUB: ======== *** ========== */}
          <div className="bg-neutral-800 rounded-md px-6 py-8 mt-4">
            <h2>Use Google Auth</h2>
            <h4 className="text-sm mb-6 mt-4">Easy and Simple Registration</h4>
            <div className="flex items-center gap-1">
              <IoStar size={18} className="text-accent" />
              <IoStar size={18} className="text-accent" />
              <IoStar size={18} className="text-accent" />
              <p className="text-sm">Higher security</p>
            </div>

            <Button
              variant="neutral"
              className="w-full bg-neutral-500 mt-4 flex items-center justify-center gap-2"
              onClick={handleLogin}
            >
              <span className="p-1 inline-flex bg-white rounded-full">
                <FcGoogle size={18} />
              </span>
              <span>Connect with Google</span>
            </Button>
          </div>
        </div>
      )}
      {steps === 1 && (
        <div className="mt-6">
          <p className="text-center text-lg mb-4 text-accent">
            Your Pass Phrase
          </p>
          <div className="grid grid-cols-3 text-center">
            {phrases &&
              phrases.split(" ").map((item) => (
                <h4 className="py-2 border border-accent/30" key={item}>
                  {item}
                </h4>
              ))}
          </div>

          <p className="text-gray-200 my-4 text-center italic">
            Save your pass phrases somewhere
          </p>

          <Button
            className=" w-ift py-3 flex justify-center items-center gap-2 mx-auto"
            onClick={() => copyLink(phrases)}
            variant="secondary"
          >
            <span>Copy</span>
            {showTooltip ? (
              <FaCheck className="size-5" />
            ) : (
              <IoCopySharp className="size-5" />
            )}
          </Button>
          <Button className=" w-full py-3 mt-8" onClick={() => setSteps(2)}>
            Continue
          </Button>
        </div>
      )}
      {steps === 2 && (
        <div className="mt-6">
          <p className="text-center text-lg mb-4 text-accent">
            Create a new password for your pass phrase
          </p>
          <div className="space-y-2">
            <label htmlFor="passphrase" className="text-neutral-400">
              Password :{" "}
            </label>
            <input
              type="text"
              className="bg-transparent px-2 py-3 block w-full border border-accent/30 outline-none rounded-md"
              id="passphrase"
            />
          </div>
          <div className="space-y-2 mt-4">
            <label htmlFor="passphrase1" className="text-neutral-400">
              Confirm Password :{" "}
            </label>
            <input
              type="text"
              className="bg-transparent px-2 py-3 block w-full border border-accent/30 outline-none rounded-md"
              id="passphrase1"
            />
          </div>

          <Button className=" w-full py-3 mt-8">Create</Button>
        </div>
      )}
    </div>
  );
};

export default NewWalletPage;
