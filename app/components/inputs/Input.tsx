"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import PasswordStrengthBar from "react-password-strength-bar";

type TInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  showPasswordStrengthBar?: boolean;
  passwordValue?: string;
};

const Input = ({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete = "off",
  passwordValue,
  showPasswordStrengthBar,
  disabled,
  formatPrice,
  register,
  required,
  errors,
  ...rest
}: TInput) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute text-neutral-700 top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        autoComplete={autoComplete}
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
        {...rest}
      />
      <label
        htmlFor={id}
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
      {showPasswordStrengthBar && passwordValue && (
        <PasswordStrengthBar
          shortScoreWord="Too Short"
          scoreWords={["Weak", "Weak", "Medium", "Good", "Strong"]}
          password={passwordValue}
          scoreWordStyle={{ fontSize: "0.875rem" }}
        />
      )}
    </div>
  );
};

export default Input;
