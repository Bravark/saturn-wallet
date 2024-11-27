import { useExtension } from "../store/context";

const PassPhraseCard = () => {
  const { account } = useExtension();
  return (
    <div className="border rounded-md p-4">
      <div className="flex  gap-2">
        <div className="size-8 rounded-full bg-white/60" />
        <div>
          <h5>
            {account?.masterAddress.substring(0, 15)}{" "}
            {account?.masterAddress &&
              account?.masterAddress.length > 15 &&
              "..."}
          </h5>
          <p className="font-thin text-xs text-neutral-600">
            {" "}
            {account?.masterAddress.substring(0, 15)}{" "}
            {account?.masterAddress &&
              account?.masterAddress.length > 15 &&
              "..."}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <p className="uppercase text-xs">Export private key</p>
        <p className="uppercase text-xs">Remove</p>
      </div>
    </div>
  );
};

export default PassPhraseCard;
