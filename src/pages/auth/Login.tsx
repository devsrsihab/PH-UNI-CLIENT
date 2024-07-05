import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setuser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
  const [login] = useLoginMutation();
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
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken);
    console.log(user);
    distpatch(setuser({ user: user, token: res.data.accessToken }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <input
        {...register("id", { required: true })}
        type="text"
      />
      <input
        {...register("password", { required: true })}
        type="password"
      />
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
