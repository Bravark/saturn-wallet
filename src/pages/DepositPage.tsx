import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { IoMdClose } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoCopySharp } from "react-icons/io5";

const DepositPage = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

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
    <div className="w-full pb-24 ">
      <div className="mt-4">
        <button onClick={() => navigate("/")}>
          <IoMdClose size={30} className="text-accent" />
        </button>
      </div>
      <div className="text-center space-y-3 mt-[2.5rem]">
        <h2 className="text-3xl semibold">Deposit</h2>
        <div className="flex justify-center">
          <img
            src="Images/icons/barcode-icon.png"
            alt="qr code"
            className="w-[10rem]"
          />
        </div>
        <div>
          <p className="text-xl">Your Archane Sooon address</p>
          <p className="text-neutral-400 text-xs w-8/12 mx-auto">
            Receive tokens using this address as your deposit address
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <Button
          className=" w-full py-4 flex justify-center items-center gap-2"
          onClick={() => copyLink("D1EbDs...HtCQ")}
        >
          <span>D1EbDs...HtCQ</span>
          {showTooltip ? (
            <FaCheck className="size-5" />
          ) : (
            <IoCopySharp className="size-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default DepositPage;
