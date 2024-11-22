import { useState } from "react";
import Button from "../components/UI/Button";
import { IoChevronDown } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

import AccountGoogleCard from "../sections/AccountGoogleCard";
import PassPhraseCard from "../sections/PassPhraseCard";

const SettingsPage = () => {
  const [showTabs, setShowTabs] = useState({
    google: true,
    phrase: false,
  });

  const navigate = useNavigate();

  return (
    <div className="pb-20">
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
      {showTabs.google && (
        <div className="mt-4">
          <AccountGoogleCard />
        </div>
      )}

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
        <button className="text-accent text-nowrap shrink-0 text-lg">
          {" "}
          + New
        </button>
      </div>

      {/* SUB: Content */}
      {showTabs.phrase && (
        <div className="flex flex-col gap-2 mt-4">
          <div className="mb-2 space-y-2">
            <PassPhraseCard />
            <PassPhraseCard />
          </div>
          <Button variant="primary" className="py-5 font-semibold">
            Add Wallet
          </Button>
        </div>
      )}

      <Button
        variant="secondary"
        className="block w-full mt-16 py-4"
        onClick={() => navigate("/")}
      >
        Close
      </Button>
    </div>
  );
};

export default SettingsPage;
