import { forwardRef } from "react";

const WithdrawalStepOne = forwardRef<HTMLInputElement>((_, ref) => {
  return (
    <div className="flex flex-col gap-1 bg-neutral-800 py-2 rounded-md px-4 ">
      <label
        htmlFor="walletAddress"
        className="text-neutral-500 font-thin text-sm"
      >
        Address
      </label>
      <input
        id="walletAddress"
        type="text"
        className="bg-transparent outline-none border-none font-thin"
        ref={ref}
      />
    </div>
  );
});

WithdrawalStepOne.displayName = "WithdrawalStepOne";

export default WithdrawalStepOne;
