// import { useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { useEffect, useState } from "react";
import { useExtension } from "../store/context";

const WelcomePage = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { decryptedPhrase, accountHandler } = useExtension();

  const handleUnlock = () => {
    if (!value || value.trim() === "") {
      return;
    }

    const data = localStorage.getItem("encryptedPhrase");

    const encryptedPhrase: { encrypted: string; salt: string } =
      data && JSON.parse(data);

    const decrypt = decryptedPhrase({
      salt: encryptedPhrase.salt,
      encrypted: encryptedPhrase.encrypted,
      password: value,
    });

    if (decrypt === null) {
      setError("Invalid Password");
      return;
    }

    accountHandler(decrypt);
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 5000);

    () => clearTimeout(timer);
  }, [error]);

  return (
    <>
      <div className="mt-6">
        <div className="mt-[8rem] mb-24 flex flex-col items-center gap-4">
          <div>
            <img src="/Images/logo.png" alt="logo" className="w-[16rem]" />
          </div>
          <p className="text-lg font-semibold uppercase">Welcome Back</p>
        </div>
        {error && (
          <p className="text-sm text-red-500 text-center italic my-2">
            {" "}
            {error}
          </p>
        )}
        <div className="space-y-2">
          <label htmlFor="passphrase" className="text-neutral-400">
            Password
          </label>
          <input
            type="text"
            className="bg-transparent px-2 py-3 block w-full border border-accent/30 outline-none rounded-md"
            id="passphrase"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <Button className=" w-full py-3 mt-8" onClick={handleUnlock}>
          Unlock
        </Button>
        <div className="text-center mt-5 text-neutral-400">
          <p>Or</p>
          <Link
            to="/configure"
            className="hover:underline underline-offset-4 hover:text-accent"
          >
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
