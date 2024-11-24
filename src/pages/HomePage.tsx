import { PiDownloadDuotone } from "react-icons/pi";
import GlossyCard from "../components/UI/GlossyCard";
import { SlRefresh } from "react-icons/sl";
import { IoWalletOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";

const HomePage = () => {
  const navigate = useNavigate();

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

  const actionButtonHandler = (path: string) => {
    if (path === "refresh") {
      window.location.reload();
    } else {
      navigate(`/${path}`);
    }
  };

  // HDR: Main JSX
  return (
    <div className="pb-20 mt-5">
      <GlossyCard className=" !px-4 !py-4 border border-accent/45">
        <div className="flex flex-col items-center gap-4">
          {/* SUB: Top */}
          <div className="flex items-center justify-between self-stretch ">
            <p>Demitchy wallet</p>
            <p>Soon Mainnet</p>
          </div>

          {/* SUB: Midlle */}
          <div className="flex items-center flex-col gap-2">
            <div className="text-gray-400">D1EbDs...HtCQ (Copy)</div>
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
