import { Button, Flex, Space } from "antd";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../../redux/features/admin/userManagement.Api";
import { TResponse } from "../../types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const PasswordChange = () => {
    const navigate = useNavigate()
    const [changePassword] = useChangePasswordMutation();
    const distpath = useAppDispatch()

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        const res = await changePassword(data).unwrap() as TResponse<any>
        if (res?.success) {
            distpath(logout())
            return navigate('/auth/login')
        }
        console.log(res);
    }
  return (
    <Flex gap={33} justify="center" align="center" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <Space direction="vertical" size="large">
          <h1>Change Your Default Password</h1>
          <PHInput
            label="Enter Old Password"
            type="password"
            name="oldPassword"
          />
          <PHInput
            label="Enter New Password"
            type="password"
            name="newPassword"
          />
          <Button htmlType="submit">Submit</Button>
        </Space>
      </PHForm>
    </Flex>
  );
};

export default PasswordChange;