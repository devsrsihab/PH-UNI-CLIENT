import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label: string;
};
const PHTimePicker = ({ name, label }: TInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <TimePicker placeholder={label} {...field} id={name} format="HH:mm" />
        </Form.Item>
      )}
    />
  );
};

export default PHTimePicker;
