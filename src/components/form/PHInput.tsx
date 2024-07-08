import { Input } from "antd";
import { Controller } from "react-hook-form";

const PHInput = ({
  type,
  name,
  label,
}: {
  type: string;
  name: string;
  label: string;
}) => {
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
