import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import GlossyCard from "../components/UI/GlossyCard";
import { IoMdCheckmark } from "react-icons/io";

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full ">
      <div className="space-y-4 mt-[3rem]">
        <div className="size-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mt-[8rem] mb-8">
          <IoMdCheckmark size={65} className="text-green-500" />
        </div>

        <div>
          <p className="text-sm text-center font-thin">Transaction</p>
          <GlossyCard className="mt-2 !px-3 !py-4  ">
            <div className="flex items-center gap-4">
              <div className="w-8 aspect-square rounded-full bg-gray-300" />
              <div>
                <p className="">HexaCat</p>
                <span className="text-red-500 font-thin">-98%</span>
              </div>
              <div className="ml-auto text-white/80">
                <p>-0.000245 SOL</p>
              </div>
            </div>
          </GlossyCard>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <Button
          variant="secondary"
          className="block w-full py-4 "
          onClick={() => navigate("/")}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
