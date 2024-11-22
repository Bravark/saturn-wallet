import { twMerge } from "tailwind-merge";
const GlossyCard = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={twMerge(
        props.className,
        "bg-[#3C3C3C3B] backdrop-blur-sm rounded-lg p-5"
      )}
    />
  );
};

export default GlossyCard;
