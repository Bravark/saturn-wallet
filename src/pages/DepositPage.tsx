import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { IoMdClose } from "react-icons/io";

const DepositPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full ">
      <div className="mt-4">
        <button onClick={() => navigate("/")}>
          <IoMdClose size={30} className="text-accent" />
        </button>
      </div>
      <div className="text-center space-y-4 mt-[3rem]">
        <h2 className="text-3xl semibold">Deposit</h2>
        <div className="flex justify-center">
          <img
            src="Images/icons/barcode-icon.png"
            alt="qr code"
            className="w-[12rem]"
          />
        </div>
        <div>
          <p className="text-xl">Your Dewallet Solana address</p>
          <p className="text-neutral-400 text-xs w-8/12 mx-auto">
            Receive tokens using this address as as your deposit address
          </p>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <Button className="block w-full py-4">D1EbDs...HtCQ (Copy)</Button>
        <Button variant="secondary" className="block w-full py-4 ">
          Share
        </Button>
      </div>
    </div>
  );
};

export default DepositPage;
