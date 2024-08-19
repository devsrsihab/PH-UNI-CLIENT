import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  label: string;
  name: string;
  options?: { value: string; label: string; disabled?: boolean }[];
  disabled?: boolean;
  mode: "multiple" | undefined;
};

const PHSelect = ({
  label,
  name,
  options,
  disabled = false,
  mode = undefined,
}: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            placeholder={label}
            style={{ width: "100%" }}
            options={options}
            mode={mode}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
