import React, { useState} from "react";
import {useNavigate} from "react-router-dom"
import InputBox from "../InputBox";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { userSignUp, userLogin } from "../../db/auth";
import {useDispatch} from 'react-redux'
import {login as authLogin} from "../../store/storeSlice"

function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signup = async (data) => {
    setError("");
    setLoader(true)
    userSignUp(data)
      .then(() => {
        userLogin(data)
          .then((res) => {
            dispatch(authLogin(res.data.data.user))
            setLoader(false)
            navigate("/")
          })
          .catch(() => {
            setError("Something went wrong try agian later");
          });
      })
      .catch((error) => {
        if (error?.response?.status === 409) {
          setError("User with this email already exist");
        } else {
          setError("Something went wrong try agian later");
        }
      });

  };

  return (
    <div className="border w-1/2 text-white max-w-[600px] backdrop-blur-lg	absolute shadow-md rounded-md p-4">
      <h2 className="text-4xl text-center mb-5 font-bold">SignUp</h2>
      {error && <p className="text-center h-9 -mt-2 duration-150">{error}</p>}
      <form className="w-full" onSubmit={handleSubmit(signup)}>
        <InputBox
          placeholder="Name"
          type="text"
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && (
          <p className="text-center h-9 -mt-2 duration-150">
            {errors.name.message}
          </p>
        )}
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

        <Button type="submit" style={{ position: "relative" }}>
          SignUp
          <div
            className="flex justify-center"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: loader ? "1" : "0",
            }}
          >
            <div className="loader"></div>
          </div>
        </Button>
        <div className="flex justify-center">
          <span className="mt-3">
            Already have an account ?{" "}
            <a
              onClick={() => navigate("/login")}
              className="font-bold cursor-pointer"
            >
              Login
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
