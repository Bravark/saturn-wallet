import Button from "../components/UI/Button";
import { FcGoogle } from "react-icons/fc";
import BackButton from "../components/UI/BackButton";

const ExistingWalletPage = () => {
  return (
    <div>
      <div className="grid grid-cols-6 items-center ">
        <BackButton />
        <h3 className="col-span-5 text-xl capitalize">
          Welcome back to Dewallet
        </h3>
      </div>
      <p className="text-center mt-6 mb-4 text-sm">Glad you are back</p>

      {/* SUB: ======== *** ========== */}
      <div className="bg-neutral-800 rounded-md px-6 py-8">
        <h2>Recovery Phrase or private key</h2>
        <h4 className="text-sm mb-8 mt-4">
          use an exisiting 12/24 word recovery phrase or private key. you can
          also import wallets from other wallet providers.
        </h4>

        <Button
          variant="neutral"
          className="w-full text-black bg-neutral-500 mt-4 block capitalize py-4 px-2 text-sm"
        >
          use Recovery phrase or private key
        </Button>
        <Button className="w-full block  mt-4 mb-6">
          Create New Recovery Phrase
        </Button>
      </div>

      {/* SUB: ======== *** ========== */}
      <div className="bg-neutral-800 rounded-md px-6 py-8 mt-4">
        <h2>Use Google Auth</h2>
        <h4 className="text-sm mb-6 mt-4">
          log in with same email address to import existing account to dewallet
        </h4>

        <Button
          variant="neutral"
          className="w-full bg-neutral-500 mt-4 flex items-center justify-center gap-2"
        >
          <span className="p-1 inline-flex bg-white rounded-full">
            <FcGoogle size={18} />
          </span>
          <span>Connect with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default ExistingWalletPage;
