import { useForm } from "react-hook-form";
import {  useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
export type SigninFormData = {
  email: string;
  password: string;
};
const SignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {showToast} = useAppContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninFormData>();
  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({message: "Sign-in Successfull!", type: "SUCCESS"});
      await queryClient.invalidateQueries("validateToken");   //invalidate the token created
      navigate("/");

    },
    onError: (error: Error) => {
      showToast({message: error.message, type: "ERROR"});
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form action="" className="flex flex-col gap-10  md:w-1/2  w-full" onSubmit={onSubmit}>
      <h2 className="text-4xl font-bold text-blue-800">Sign In</h2>

      <label className="text-gray-300 text-lg font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal mt-2 text-black"
          {...register("email", { required: "This field is required " })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-300 text-lg font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal mt-2 text-black"
          {...register("password", {
            required: "This field is required ",
            minLength: {
              value: 6,
              message: "Passwordmust be 6 or more characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
      <span className="text-base text-gray-300">Not Registered? <Link to="/register" className="underline">Create an account </Link></span>
        <button
          type="submit"
          className=" text-white p-2 font-bold hover:bg-blue-900 text-xl rounded-lg"
        >
          Login
        </button>
        
      </span>
    </form>
  );
};
export default SignIn;
