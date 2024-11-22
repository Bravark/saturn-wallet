import { twMerge } from "tailwind-merge";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: keyof typeof VARIANT;
}

const VARIANT = {
  primary: "rounded-md p-4  bg-gold-gradient text-black",
  secondary: "border-accent border p-4 rounded-md text-accent",
  neutral: "bg-neutral-800 text-white p-4 rounded-md",
};

const Button = ({ children, variant, className, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge(VARIANT[variant || "primary"], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
