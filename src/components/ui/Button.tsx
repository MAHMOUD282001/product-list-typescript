import { ButtonHTMLAttributes, memo, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  classes: string;
  width?: 'w-full' | 'w-fit';
}

function Button({ children, classes, width, ...props }: IProps) {
  return (
    <button
      className={`text-white px-4 py-2 rounded-md ${width} ${classes}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default memo(Button);
