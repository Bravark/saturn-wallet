import { FcGoogle } from "react-icons/fc";

const AccountGoogleCard = () => {
  return (
    <div className="border bg-white/40 rounded-md p-4 text-black">
      <div className="flex  gap-2">
        <div className="size-8 rounded-full">
          <span className="p-1 inline-flex bg-white rounded-full">
            <FcGoogle size={18} />
          </span>
        </div>
        <div>
          <h5>0x2af6...8550</h5>
          <p className="font-thin text-xs text-neutral-700">0x2af6...8550</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <p className="uppercase text-xs">Edit nickname</p>

        <p className="uppercase text-xs">Remove</p>
      </div>
    </div>
  );
};

export default AccountGoogleCard;
