import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      {/* SUB: Background image */}

      <img
        src="/Images/Rectangle.png"
        alt="bg"
        role="presentation"
        className="fixed inset-0 object-cover w-full h-full  -z-[100] opacity-75"
      />
      <div className="p-5 px-8 w-[26rem] mx-auto  h-[42rem] bg-[#3C3C3C3B] backdrop-blur-sm rounded-md  overflow-auto">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
