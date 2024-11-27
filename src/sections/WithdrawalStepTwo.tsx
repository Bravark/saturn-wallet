import { forwardRef, useState } from "react";
import { TbArrowsDownUp } from "react-icons/tb";

interface WithdrawalStepTwoProps {
  symbol: string;
}

const WithdrawalStepTwo = forwardRef<HTMLInputElement, WithdrawalStepTwoProps>(
  ({ symbol }: { symbol: string }, ref) => {
    const [swapInput] = useState({
      from: symbol,
      to: "$",
    });

    // const swapHandler = () => {
    //   setSwapInput({ from: swapInput.to, to: swapInput.from });
    // };

    return (
      <div className=" flex flex-col items-center gap-2">
        <div className="flex items-end gap-2 self-stretch">
          <input
            type="number"
            min={0.00003}
            step={0.0025}
            defaultValue={0.01}
            className="text-3xl bg-transparent  outline-none border-none w-[85%] min-w-[3rem] text-end"
            ref={ref}
            autoFocus
          />
          <span className="text-neutral-400">{swapInput.from}</span>
        </div>

        <button
          type="button"
          className="bg-black text-accent p-2 rounded-md cursor-not-allowed"
          // onClick={swapHandler}
        >
          <TbArrowsDownUp size={20} />
        </button>

        <p className="px-4 py-2 bg-neutral-800 rounded-lg font-thin  text-neutral-400">
          {swapInput.to} N/A
        </p>
      </div>
    );
  }
);

WithdrawalStepTwo.displayName = "WithdrawalStepTwo";

export default WithdrawalStepTwo;
