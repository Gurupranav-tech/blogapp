import React from "react";

type Props = {
  type: "text" | "email" | "password";
  name: string;
  required?: boolean;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormInput({
  type,
  name,
  required = false,
  value,
  handleChange,
}: Props) {
  return (
    <div className="">
      <label htmlFor={name} className="text-xl block mb-1">
        {name}
      </label>
      <input
        type={type}
        id={name}
        className="w-full block outline-none border border-black rounded-md py-2 px-2 text-xl"
        placeholder={name}
        required={required}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
