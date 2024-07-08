import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label: string;
};
const PHInput = ({ type, name, label }: TInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Input placeholder={label} {...field} id={name} type={type} />
      )}
    />
  );
};

export default PHInput;
