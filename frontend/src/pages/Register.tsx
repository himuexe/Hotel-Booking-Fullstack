import { useForm } from "react-hook-form";
import {  useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {showToast} = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const mutation = useMutation(apiClient.register, {
    // on mutation returns result [post put]
    onSuccess: async() => {
      showToast({message: "Registration Success!", type: "SUCCESS"});
      await queryClient.invalidateQueries("validateToken"); //invalidate the token created
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({message:error.message, type:"ERROR"})
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5 w-full md:w-2/3" onSubmit={onSubmit}>
      <h2 className="text-4xl text-blue-800 font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5 ">
        <label className="text-gray-300 text-base font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal mt-2 text-black"
            {...register("firstName", { required: "This field is required " })} //"firstName"=> what field is used in this input form
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-300 text-base font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal mt-2 text-black"
            {...register("lastName", { required: "This field is required " })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-300 text-base font-bold flex-1">
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
      <label className="text-gray-300 text-base font-bold flex-1">
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
      <label className="text-gray-300 text-base font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal mt-2 text-black"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") != val) {
                return "Yours passwords do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
      <span className="text-base text-gray-300">Already have an account? <Link to="/sign-in" className="underline"> Sign In </Link></span>
        <button
          type="submit"
          className=" text-white p-2 font-bold hover:bg-blue-900 text-xl rounded-lg"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};
export default Register;
