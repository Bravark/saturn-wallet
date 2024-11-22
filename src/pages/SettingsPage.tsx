import { useState } from "react";
import Button from "../components/UI/Button";
import { IoChevronDown } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [showTabs, setShowTabs] = useState({
    google: true,
    phrase: true,
  });

  const navigate = useNavigate();

  return (
    <div className="">
      <h2 className="text-center my-8 text-xl">Manage Accounts</h2>

      {/* SUB: Google Tab */}
      <div className="flex items-center gap-3">
        <IoChevronDown
          size={25}
          className={twMerge(showTabs.google && "rotate-180", "shrink-0")}
          onClick={() =>
            setShowTabs((prev) => ({ ...prev, google: !prev.google }))
          }
        />
        <p className="text-xl">Google</p>
        <span className="w-full h-2 inline-block border-b-2 border-dashed border-neutral-400" />
      </div>
      {/* SUB: Content */}
      {showTabs.google && <div className="mt-4">Google div</div>}

      {/* SUB: Phrase Tab */}
      <div className="flex items-center gap-3 mt-8">
        <IoChevronDown
          size={20}
          className={twMerge(showTabs.phrase && "rotate-180", "shrink-0")}
          onClick={() =>
            setShowTabs((prev) => ({ ...prev, phrase: !prev.phrase }))
          }
        />
        <p className="text-lg text-nowrap">Passphrase Derived</p>
        <span className="w-full h-2 inline-block border-b-2 border-dashed border-neutral-400" />
      </div>

      {/* SUB: Content */}
      {showTabs.phrase && (
        <div className="flex flex-col gap-2 mt-4">
          <div>Phrase</div>
          <Button variant="primary" className="py-5">
            Add Wallet
          </Button>
        </div>
      )}

      <Button
        variant="secondary"
        className="block w-full mt-20 py-4"
        onClick={() => navigate("/")}
      >
        Close
      </Button>
    </div>
  );
};

export default SettingsPage;
