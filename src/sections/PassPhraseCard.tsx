const PassPhraseCard = () => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex  gap-2">
        <div className="size-8 rounded-full bg-white/60" />
        <div>
          <h5>0x2af6...8550</h5>
          <p className="font-thin text-xs text-neutral-600">0x2af6...8550</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <p className="uppercase text-xs">Edit nickname</p>
        <p className="uppercase text-xs">Export private key</p>
        <p className="uppercase text-xs">Remove</p>
      </div>
    </div>
  );
};

export default PassPhraseCard;
