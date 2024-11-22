import { Link } from "react-router-dom";

const HomeLogo = () => {
  return (
    <Link to="/">
      <img src="/Images/logo.png" alt="logo" className="w-[6rem]" />
    </Link>
  );
};

export default HomeLogo;
