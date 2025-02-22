interface IProps {
  message: string;
}

function ErrorMessage({ message }: IProps) {
  return message && <span className="block text-red-500 font-semibold text-sm">{message}</span>;
}

export default ErrorMessage;
