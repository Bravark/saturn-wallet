import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import Button from "../components/UI/Button";
import { IoMdArrowBack, IoMdCheckmark } from "react-icons/io";
import { useExtension } from "../store/context";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/UI/BackButton";

const ExistingPassphrasesPage = () => {
  const [errors, setErrors] = useState("");
  const [phrases, setPhrases] = useState("");
  const [steps, setSteps] = useState(0);

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const inputRefs = useRef([]);

  const navigate = useNavigate();

  const { encryptedPhrase } = useExtension();

  //   SUB: Handle enter to submit
  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        //@ts-ignore
        nextInput.focus();
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors("");
    }, 5000);

    () => clearTimeout(timer);
  }, [errors]);

  //   HDR: Submitting passphrase
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //@ts-ignore
    const values = inputRefs.current.map((ref) => ref?.value.trim() || "");
    const isEmpty = values.some((values) => values == "");
    if (isEmpty) {
      setErrors("Provide all phrases");
      return;
    }
    const phrase = values.join(" ");
    setPhrases(phrase);
    setSteps(1);
  };

  // HDR: Creating a new passphrase password
  const createPassWord = () => {
    if (
      passwordRef.current?.value === "" ||
      passwordConfirmRef.current?.value === ""
    ) {
      setErrors("Error creating password");
      return;
    }
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      setErrors("Password does not match");
      return;
    }

    const encrypt = encryptedPhrase(
      phrases,
      passwordRef.current?.value as string
    );

    if (encrypt.encrypted) {
      if (process.env.NODE_ENV !== "production") {
        localStorage.setItem("encryptedPhrase", JSON.stringify(encrypt));
      } else {
        //@ts-ignore
        chrome.runtime.sendMessage({
          type: "setEncryption",
          encrypt: JSON.stringify(encrypt),
        });
      }

      setSteps(2);
    }
  };

  return (
    <div className="mb-20 mt-4 flex flex-col gap-5">
      {steps === 0 && (
        <div className="grid grid-cols-4 items-center ">
          <div>
            <BackButton />
          </div>
          <h3 className="col-span-3 text-xl capitalize">Create new wallet</h3>
        </div>
      )}
      {steps > 0 && steps < 2 && (
        <div className="grid grid-cols-4 items-center ">
          <button
            className="flex items-center gap-1"
            onClick={() => setSteps((prev) => --prev)}
          >
            <IoMdArrowBack className="size-5" /> <span>Go back</span>
          </button>
        </div>
      )}

      {/* HDR: STEP 1 */}
      {steps === 0 && (
        <div>
          <div className="text-center">
            <h3 className="text-xl mb-2">Secret Recovery Phrase</h3>
            <p className="text-sm text-neutral-500">
              Import an existing wallet with your 12 word secret recovery phrase
            </p>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-2 gap-y-4">
              {Array.from({ length: 12 }, (_, index) => (
                <div key={index} className="relative ">
                  <span className="text-neutral-600 absolute text-sm top-1/2 -translate-y-1/2 left-1">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    className="bg-black/60 inline-block w-full pl-5 py-2 rounded-md outline-none border border-accent/30"
                    //@ts-ignore
                    ref={(el) => (inputRefs.current[index] = el)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                </div>
              ))}
            </div>

            {errors && (
              <p className="text-sm text-red-500 text-center italic my-4">
                {" "}
                {errors}
              </p>
            )}
            <Button className="mt-8 w-full block">Import Wallet</Button>
          </form>
        </div>
      )}

      {/* HDR: Creating a password */}
      {steps === 1 && (
        <div className="mt-6">
          <p className="text-center text-lg mb-4 text-accent">
            Create a new password for your pass phrase
          </p>
          {errors && (
            <p className="text-sm text-red-500 text-center italic my-4">
              {" "}
              {errors}
            </p>
          )}
          <div className="space-y-2">
            <label htmlFor="passphrase" className="text-neutral-400">
              Password{" "}
            </label>
            <input
              type="text"
              className="bg-transparent px-2 py-3 block w-full border border-accent/30 outline-none rounded-md"
              id="passphrase"
              ref={passwordRef}
            />
          </div>
          <div className="space-y-2 mt-4">
            <label htmlFor="passphrase1" className="text-neutral-400">
              Confirm Password{" "}
            </label>
            <input
              type="text"
              className="bg-transparent px-2 py-3 block w-full border border-accent/30 outline-none rounded-md"
              id="passphrase1"
              ref={passwordConfirmRef}
            />
          </div>

          <Button className=" w-full py-3 mt-8" onClick={createPassWord}>
            Create
          </Button>
        </div>
      )}

      {/* HDR: Sucessfully created password */}
      {steps === 2 && (
        <div className="mt-6">
          <div className="size-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mt-[8rem] mb-8">
            <IoMdCheckmark size={65} className="text-green-500" />
          </div>
          <p className="text-center text-lg mb-4">
            Password created successfully
          </p>

          <Button
            className=" w-full py-3 mt-8"
            onClick={() => navigate("/welcome")}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExistingPassphrasesPage;
