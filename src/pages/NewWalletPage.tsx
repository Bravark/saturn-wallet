import { IoStar } from "react-icons/io5";
import BackButton from "../components/UI/BackButton";
import Button from "../components/UI/Button";
import { FcGoogle } from "react-icons/fc";

const NewWalletPage = () => {
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
  return (
    <div>
      <div className="grid grid-cols-4 items-center ">
        <BackButton />
        <h3 className="col-span-3 text-xl capitalize">Create new wallet</h3>
      </div>
      <p className="text-center mt-6 mb-4 text-sm">
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

        <Button className="w-full block  mt-4 mb-6">
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
  );
};

export default NewWalletPage;
