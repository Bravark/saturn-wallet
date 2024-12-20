import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../components/UI/Button";
import GlossyCard from "../components/UI/GlossyCard";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import WithdrawalStepOne from "../sections/WithdrawalStepOne";
import WithdrawalStepTwo from "../sections/WithdrawalStepTwo";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { useExtension } from "../store/context";
import { formatter } from "../utils";

const WithdrawalPage = () => {
  const [steps, setSteps] = useState<"one" | "two">("one");
  const [balance, setBalance] = useState<undefined | number>();
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);

  const { account } = useExtension();

  const walletAddrInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // SUB: Withdrawal Data
  const [walletAddr, setWalletAddr] = useState("");

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
  const withDrawalHandler = async () => {
    if (steps === "one") {
      if (
        !walletAddrInputRef.current?.value ||
        walletAddrInputRef.current?.value.trim() === ""
      ) {
        walletAddrInputRef.current?.focus();
        return;
      }

      const isAddrValid = account?.validateAddress(
        walletAddrInputRef.current?.value!
      )!;
      if (isAddrValid) {
        setSteps("two");

        setWalletAddr(walletAddrInputRef.current?.value!);
      } else {
        setErrors("Invalid wallet address");
      }
    }
    if (steps === "two") {
      const res = await account?.SendTransaction(
        walletAddr,
        parseFloat(amountInputRef.current?.value!)
      );

      if (res?.status === true) {
        setSuccess(true);
      }
    }
  };

  const getBalance = async () => {
    try {
      const bal = await account?.getNativeBalance();
      setBalance(bal);
    } catch (error) {}
  };

  useEffect(() => {
    if (walletAddrInputRef.current) {
      walletAddrInputRef.current?.focus();
    }
    getBalance();
  }, []);

  // HDR: Clear errors
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors("");
    }, 5000);

    () => clearTimeout(timer);
  }, [errors]);

  return (
    <>
      {!success && (
        <div className="mb-20 mt-4 flex flex-col gap-5">
          <div className="grid grid-cols-3 items-center  gap-20">
            <button onClick={stepsHandler}>
              <TbArrowBackUp size={40} className="text-accent" />
            </button>
            {steps === "two" && (
              <>
                <p>Amount</p>

                <button onClick={() => navigate("/")}>
                  <IoMdClose size={40} className="text-accent" />
                </button>
              </>
            )}
          </div>
          <GlossyCard className="border border-accent/45 min-h-[6rem] ">
            {steps === "one" && (
              <div>
                {/* SUB: Input  */}
                <WithdrawalStepOne ref={walletAddrInputRef} />

                {/* SUB: Receent  */}
                {/* <div className="mt-4">
              <h3 className="text-xl">Recent</h3>

              <div className="mt-2  max-h-[15rem] h-full overflow-y-scroll space-y-2">
                <div className="flex items-center gap-1 justify-between bg-neutral-800 rounded-md p-4 ">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm">Wallet</p>
                      <span className="inline-flex px-1.5 rounded-md text-xs text-emerald-400 bg-teal-900 font-semibold">
                        W1
                      </span>
                    </div>
                    <p className="text-sm">D1EbDs...HtCQ</p>
                  </div>
                  <FaArrowRight className="text-neutral-500" />
                </div>
                <div className="flex items-center gap-1 justify-between bg-neutral-800 rounded-md p-4 ">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm">Wallet</p>
                      <span className="inline-flex px-1.5 rounded-md text-xs text-emerald-400 bg-teal-900 font-semibold">
                        W1
                      </span>
                    </div>
                    <p className="text-sm">D1EbDs...HtCQ</p>
                  </div>
                  <FaArrowRight className="text-neutral-500" />
                </div>
              </div>
            </div> */}
              </div>
            )}
            {steps === "two" && (
              <div className="flex flex-col items-center gap-12 ">
                <div className="flex items-center gap-1 text-neutral-400">
                  <p>To:</p>
                  <p>
                    {walletAddr.substring(0, 20)}
                    {walletAddr.length > 20 && "..."}
                  </p>
                </div>

                <WithdrawalStepTwo
                  symbol={account?.chain.symbol!}
                  ref={amountInputRef}
                />
              </div>
            )}
          </GlossyCard>

          {steps === "two" && (
            <div className="flex justify-between items-center">
              <Button
                variant="neutral"
                className="font-thin uppercase px-4"
                onClick={() => {
                  if (amountInputRef.current) {
                    amountInputRef.current.value = balance?.toString() || "0";
                  }
                }}
              >
                Max
              </Button>
              <p className="font-thin">
                Available : {formatter({}).format(balance || 0)}{" "}
                {account?.chain.symbol}
              </p>
            </div>
          )}
          <Button
            variant="primary"
            className="flex items-center justify-center w-full  py-4 text-xl"
            onClick={withDrawalHandler}
          >
            Continue
          </Button>
        </div>
      )}
      {success && (
        <>
          <div className="mt-6 mb-40">
            <div className="size-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mt-[8rem] mb-8">
              <IoMdCheckmark size={65} className="text-green-500" />
            </div>
            <p className="text-center text-lg mb-4">
              {account?.chain.symbol} successfully
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default WithdrawalPage;
