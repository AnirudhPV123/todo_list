import React, { useEffect, useState } from "react";
import InputBox from "../InputBox";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { userLogin } from "../../db/auth";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/storeSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {
  const authStatus = useSelector((state) => state.auth.status);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus) {
      navigate("/");
    }
  }, [authStatus, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    setError("");
    try {
      userLogin(data).then((res) => {
        dispatch(authLogin(res.data.data.user));
        navigate("/");
      });
    } catch (error) {
      if (error?.response?.status === 404) {
        setError("Invalide password");
      } else {
        setError("Something went wrong try agian later");
      }
    }
  };

  return (
    <div className="border w-1/2 text-white max-w-[600px] backdrop-blur-lg	absolute shadow-md rounded-md p-4">
      <h2 className="text-4xl text-center mb-5 font-bold">Login</h2>
      {error && <p className="text-center h-9 -mt-2 duration-150">{error}</p>}
      <form className="w-full" onSubmit={handleSubmit(login)}>
        <InputBox
          placeholder="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />

        {errors.email && (
          <p className="text-center h-9 -mt-2 duration-150">
            {errors.email.message}
          </p>
        )}

        <InputBox
          placeholder="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        {errors.password && (
          <p className="text-center h-9 -mt-2 duration-150">
            {errors.password.message}
          </p>
        )}

        <Button type="submit">Login</Button>
        <div className="flex justify-center">
          <span className="mt-3">
            Create an account ?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="font-bold cursor-pointer"
            >
              SignUp
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
