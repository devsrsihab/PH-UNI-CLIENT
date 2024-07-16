import { Button, Flex, Space } from "antd";
import { SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setuser, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";

const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const distpatch = useAppDispatch();

  const defaultValues = {
    id: "A-0001",
    password: "112233445566",
  };

  type TPayload = {
    id: string;
    password: string;
  };

  const onSubmit: SubmitHandler<TPayload> = async (payload: TPayload) => {
    console.log(payload);
    const userInfo = {
      id: payload.id,
      password: payload.password,
    };
    const toastId = 3123213;
    toast.loading("Loading data", { id: toastId });
    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      distpatch(setuser({ user: user, token: res.data.accessToken }));
      navigate(`/${user.role}/dashboard`);
      toast.success("Login Successfully", { id: toastId, duration: 1000 });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex gap={33} justify="center" align="center" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <Space direction="vertical" size="large">
          <h1>Login</h1>
          <PHInput label="Enter ID" type="text" name="id" />
          <PHInput label="Enter Password" type="password" name="password" />
          <Button htmlType="submit">Submit</Button>
        </Space>
      </PHForm>
    </Flex>
  );
};

export default Login;
