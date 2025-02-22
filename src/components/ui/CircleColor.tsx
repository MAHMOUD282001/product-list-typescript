import { HTMLAttributes, memo } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

function CircleColor({ color, ...props }: IProps) {
  return (
    <span
      className={`w-5 h-5 rounded-full cursor-pointer`}
      style={{ backgroundColor: color }}
      {...props}
    ></span>
  );
}

export default memo(CircleColor);
