const HomeSkeleton = () => {
  return (
    <div className="pb-40 mt-12">
      <div className=" !px-4 !py-6  bg-neutral-800  rounded-md h-[13rem] animate-pulse"></div>
      <h3 className="my-5 bg-neutral-800  rounded-md h-[3rem] w-24 animate-pulse  "></h3>

      <div className="space-y-2">
        <div className="mt-5   bg-neutral-800  rounded-md h-[18rem] animate-pulse "></div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
