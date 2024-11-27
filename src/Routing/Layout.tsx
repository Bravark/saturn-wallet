// import NavBar from "@components/NavBar.jsx";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import HomeLogo from "../components/Navbar/HomeLogo";

const Layout = () => {
  return (
    <>
      {/* SUB: Background image */}

      <img
        src="/Images/Rectangle.png"
        alt="bg"
        role="presentation"
        className="fixed inset-0 object-cover w-full h-full  -z-[100]"
      />

      <div className=" w-[26rem] mx-auto relative  h-[42rem] overflow-auto">
        <div className="px-5 mt-4">
          <HomeLogo />
          <main>
            <Outlet />
          </main>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default Layout;
