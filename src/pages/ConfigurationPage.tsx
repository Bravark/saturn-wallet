import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

const ConfigurationPage = () => {
  return (
    <div className="flex flex-col items-center gap-28">
      <div className="mt-[10rem] flex flex-col items-center gap-4">
        <div>
          <img src="/Images/logo.png" alt="logo" className="w-[20rem]" />
        </div>
        <p className="text-xl uppercase">Soon Wallet</p>
      </div>
      <div className="self-stretch  space-y-4">
        <Button className="block w-full py-4 font-semibold">
          <Link to="/wallet-new">Create new wallet</Link>
        </Button>
        <Button variant="secondary" className="block w-full py-4 font-semibold">
          <Link to="/wallet-existing">Import an existing wallet</Link>
        </Button>
      </div>
    </div>
  );
};

export default ConfigurationPage;
