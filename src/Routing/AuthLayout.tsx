import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      {/* SUB: Background image */}

      <img
        src="/Images/Rectangle.png"
        alt="bg"
        role="presentation"
        className="fixed inset-0 object-cover w-full h-full -top-10 -z-[100] opacity-75"
      />
      <div className="p-5 px-8">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
