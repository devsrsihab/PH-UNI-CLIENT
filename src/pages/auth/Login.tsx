import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setuser, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<TPayload>({
    defaultValues: { id: "A-0001", password: "112233445566" },
  });
  const distpatch = useAppDispatch();

  type TPayload = {
    id: string;
    password: string;
  };

  const onSubmit: SubmitHandler<TPayload> = async (
    payload: TPayload
  ): Promise<void> => {
    const userInfo = {
      id: payload.id,
      password: payload.password,
    };

    const toastId = toast.loading("Loading data");
    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      distpatch(setuser({ user: user, token: res.data.accessToken }));
      navigate(`/${user.role}/dashboard`);
      toast.success("Login Successfully", { id: toastId });
    } catch (error) {
      toast.error("incorrect username or password", { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <input {...register("id", { required: true })} type="text" />
      <input {...register("password", { required: true })} type="password" />
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
