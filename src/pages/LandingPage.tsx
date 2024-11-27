import { useState } from "react";
import Button from "../components/UI/Button";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

const WELCOMEINFO = [
  {
    title: "Keep track of your cryptocurrency",
    text: "Have access to your own special and secure wallet where you make all your own financial decisions",
  },
  {
    title: "Conveient backup with cloud storage",
    text: "Save your information safely to  encrypted and backed up cloud provider where you only would be able to access it.",
  },
  {
    title: "Protect your wallet and coins",
    text: "   Have access to extra protection for all your funds and coins in your cryptocurrency wallet.",
  },
];
const LandingPage = () => {
  const [steps, setSteps] = useState(0);

  const navigate = useNavigate();

  const clickHander = () => {
    if (steps === WELCOMEINFO.length - 1) {
      navigate("/configure");
      return;
    }
    setSteps(steps + 1);
  };

  return (
    <>
      <div className="w-full ">
        <div className="text-end">
          <button onClick={() => navigate("/configure")}>Skip</button>
        </div>
        <div className="text-center space-y-8 mt-[10rem]">
          <h2 className="text-3xl semibold">{WELCOMEINFO[steps].title}</h2>
          <p className="text-neutral-400">{WELCOMEINFO[steps].text}</p>
        </div>
        <div className="mt-16 mb-8 flex items-center justify-center gap-6">
          {WELCOMEINFO.map((_, index) => (
            <span
              key={index}
              onClick={() => setSteps(index)}
              className={twMerge(
                "block size-3 rounded-full bg-gray-500",
                steps === index && "bg-accent"
              )}
            />
          ))}
        </div>
        <Button className="block w-full py-4" onClick={clickHander}>
          {steps === WELCOMEINFO.length - 1 ? "Get Started" : "Next"}
        </Button>
      </div>
    </>
  );
};

export default LandingPage;
