import { PiDownloadDuotone } from "react-icons/pi";
import GlossyCard from "../components/UI/GlossyCard";
import { SlRefresh } from "react-icons/sl";
import { IoCopySharp, IoWalletOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { FaCheck } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";

const ActionButtons = [
  {
    label: "Deposit",
    icon: <IoWalletOutline size={20} className="text-accent" />,
    path: "deposit",
  },
  {
    label: "Withdraw",
    icon: <PiDownloadDuotone size={20} className="text-accent" />,
    path: "withdraw",
  },
  {
    label: "Refresh",
    icon: <SlRefresh size={20} className="text-accent" />,
    path: "refresh",
  },
];

const HomePage = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const actionButtonHandler = (path: string) => {
    if (path === "refresh") {
      window.location.reload();
    } else {
      navigate(`/${path}`);
    }
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

  // "key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuQP06g/HshpBcosLVte9klud72Jmv0r8dwwY//qlCgG8XK7/wrSst3fXlkmGVzgT7AuaImE5DrvbUXG75Cz17BKVjIpdexbnak7QMK6ixqA4TR38OKhh0XcZD1VLcPrjo0TdU/uUtd/5CORingj7We3PQxDgUe7jrwcaCD5iNYBOcCE1qs5b6oQ51nO7B5harNvhQ8NmZqqWBQblG58oLQuAjj6IifLSHp+xosuA2iGspibXLVA/GaqXmztDG5lc/KKpaFNQRxldOpBjRzGU/ftmStw9RiPRrTDfbzRCywFhMutm4RsLgUEAE+oD2kE9vcKyNA1/0MldgZ8WQnq64wIDAQAB"

  useEffect(() => {
    //@ts-ignore
    chrome.storage.sync.get("encryptedPhrase", (result) => {
      console.log("encryptedPhrase", result.encryptedPhrase);
      //@ts-ignore
      if (!result.encryptedPhrase) {
        navigate("/welcome");
      }
    });
    //@ts-ignore
  }, []);

  // HDR: Main JSX
  return (
    <div className="pb-20 mt-12">
      <GlossyCard className=" !px-4 !py-6 border border-accent/45">
        <div className="flex flex-col items-center gap-4">
          {/* SUB: Top */}
          {/* <div className="flex items-center justify-between self-stretch ">
            <p>Demitchy wallet</p>
            <p>Soon Mainnet</p>
          </div> */}

          {/* SUB: Midlle */}
          <div className="flex items-center flex-col gap-2">
            <div className="text-gray-400 flex items-center gap-2">
              <p>D1EbDs...HtCQ</p>
              <button onClick={() => copyLink("one-two-three")}>
                {showTooltip ? (
                  <FaCheck className="size-5 text-green-500" />
                ) : (
                  <IoCopySharp className="size-5" />
                )}
              </button>
            </div>
            <h3 className="text-4xl">0.000 SOL</h3>
            <div className="flex items-center font-thin gap-2">
              <p className="text-gray-400">$0.000</p>
              <p className="text-red-500">(-70%)</p>
            </div>
          </div>

          {/* SUB: Bottom */}
          <div className="flex items-center gap-10 justify-center self-stretch">
            {ActionButtons.map((item, index) => (
              <Button
                key={index}
                variant="secondary"
                className="flex items-center flex-col gap-1 p-3"
                onClick={() => actionButtonHandler(item.path)}
              >
                <span>{item.icon}</span>
                <span className="tex-xs font-thin">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </GlossyCard>
      <h3 className="my-5 text-xl">Assets</h3>

      <div className="space-y-2">
        <GlossyCard className="mt-5 !px-5 !py-7  ">
          <div className="flex items-center gap-4">
            <div className="w-12 aspect-square rounded-full bg-gray-300" />
            <div>
              <p className="text-xl">HexaCat</p>
              <span className="text-red-500 font-thin">-98%</span>
            </div>
            <div className="ml-auto text-white/80">
              <p>0.50 hex</p>
              <p className="font-thin">$72..46</p>
            </div>
          </div>
        </GlossyCard>
        <GlossyCard className="mt-5 !px-5 !py-7 ">
          <div className="flex items-center gap-4">
            <div className="w-12 aspect-square rounded-full bg-gray-300" />
            <div>
              <p className="text-xl">HexaCat</p>
              <span className="text-red-500 font-thin">-98%</span>
            </div>
            <div className="ml-auto text-white/80">
              <p>0.50 hex</p>
              <p className="font-thin">$72..46</p>
            </div>
          </div>
        </GlossyCard>
      </div>
    </div>
  );
};

export default HomePage;
