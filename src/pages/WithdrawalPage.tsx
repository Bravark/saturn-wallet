import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../components/UI/Button";
import GlossyCard from "../components/UI/GlossyCard";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import WithdrawalStepOne from "../sections/WithdrawalStepOne";
import WithdrawalStepTwo from "../sections/WithdrawalStepTwo";
import { IoMdClose } from "react-icons/io";

const WithdrawalPage = () => {
  const [steps, setSteps] = useState<"one" | "two">("one");
  const walletAddrInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // SUB: Withdrawal Data
  const [withdrawalInfo, setWithdrawalInfo] = useState({
    walletAddr: "",
    amount: "",
  });

  // HDR: Navigator
  const stepsHandler = () => {
    if (steps === "one") {
      navigate(-1);
    }
    if (steps === "two") {
      setSteps("one");
    }
    return;
  };

  // HDR: Submit/ continue functionality
  const withDrawalHandler = useCallback(() => {
    if (steps === "one") {
      if (
        !walletAddrInputRef.current?.value ||
        walletAddrInputRef.current?.value.trim() === ""
      ) {
        console.log("Empty wallet address");
        walletAddrInputRef.current?.focus();
        return;
      }
      setSteps("two");
      setWithdrawalInfo((prev) => ({
        ...prev,
        walletAddr: walletAddrInputRef.current?.value!,
      }));
    }
    if (steps === "two") {
      console.log("Last step");
    }
    return;
  }, [walletAddrInputRef.current]);

  useEffect(() => {
    if (walletAddrInputRef.current) {
      walletAddrInputRef.current?.focus();
    }
  }, []);

  return (
    <div className="mb-20 mt-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <button onClick={stepsHandler}>
          <TbArrowBackUp size={40} className="text-accent" />
        </button>
        {steps === "two" && (
          <div>
            <p>Amount</p>

            <button onClick={() => navigate("/")}>
              <IoMdClose size={40} className="text-accent" />
            </button>
          </div>
        )}
      </div>
      <GlossyCard className="border border-accent/45 min-h-[20rem]">
        {steps === "one" && (
          <div>
            {/* SUB: Input  */}
            <WithdrawalStepOne ref={walletAddrInputRef} />

            {/* SUB: Receent  */}
            <div className="mt-4">
              <h3 className="text-xl">Recent</h3>

              <div className="mt-2  max-h-[15rem] h-full overflow-y-scroll space-y-2">
                <div className="flex items-center gap-1 justify-between bg-neutral-800 rounded-md p-4 ">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p>Wallet</p>
                      <span className="inline-flex px-1.5 rounded-md tex-xs text-emerald-400 bg-teal-900 font-semibold">
                        W1
                      </span>
                    </div>
                    <p>D1EbDs...HtCQ</p>
                  </div>
                  <FaArrowRight className="text-neutral-500" />
                </div>
                <div className="flex items-center gap-1 justify-between bg-neutral-800 rounded-md p-4 ">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p>Wallet</p>
                      <span className="inline-flex px-1.5 rounded-md tex-xs text-emerald-400 bg-teal-900 font-semibold">
                        W1
                      </span>
                    </div>
                    <p>D1EbDs...HtCQ</p>
                  </div>
                  <FaArrowRight className="text-neutral-500" />
                </div>
              </div>
            </div>
          </div>
        )}
        {steps === "two" && (
          <div className="flex flex-col items-center gap-16 ">
            <div className="flex items-center gap-1 text-neutral-400">
              <p>To:</p>
              <p>{withdrawalInfo.walletAddr}</p>
            </div>

            <WithdrawalStepTwo />
          </div>
        )}
      </GlossyCard>

      {steps === "two" && (
        <div className="flex justify-between items-center">
          <Button variant="neutral" className="font-thin uppercase px-4">
            Max
          </Button>
          <p className="font-thin">Available : 0 SOLANA</p>
        </div>
      )}
      <Button
        variant="primary"
        className="flex items-center justify-center w-full  py-5 text-xl"
        onClick={withDrawalHandler}
      >
        Continue
      </Button>
    </div>
  );
};

export default WithdrawalPage;
