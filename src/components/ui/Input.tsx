import { InputHTMLAttributes, memo } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...props }: IProps) {
  return (
    <input
      className="border-[1px] border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md px-3 py-3 text-md"
      {...props}
    />
  );
}

export default memo(Input);
