import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/users.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const userRegister = asyncHandler(async (req, res) => {
  // get filed from req.body
  // check validate filed
  // check email already existed
  // password bcrypt
  // create user object
  // get user and remove password and refresh token
  // return user

  try {
    const { name, email, password } = req.body;
    if ([name, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Every field must be required");
    }

    const checkUserExisted = await User.findOne({ email });

    if (checkUserExisted) {
      throw new ApiError(409, "User with this email already exist");
    }

    const createdUser = await User.create({
      name,
      email,
      password,
    });

    const user = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(createdUser._id) },
      },
      {
        $project: { _id: 1 },
      },
    ]);

    if (!user) {
      throw new ApiError(
        500,
        "Something went wrong while registering user in database"
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user[0], "User registered successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error);
  }
});

const userLogin = asyncHandler(async (req, res) => {
  // get email and password form req.body
  // validate
  // get user db
  // password compare
  // generate refresh and access token
  // update user with refresh token
  // return res cookie token
  try {
    const { email, password } = req.body;
    if ([email, password].some((field) => field.trim() === "")) {
      throw new ApiError(400, "Email and Password must be required");
    }

    const user = await User.findOne({ email });

    const checkPasswordCorrect = await user.isPasswordCorrect(password);

    if (!checkPasswordCorrect) {
      throw new ApiError(404, "Invalid Password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const userLoggedIn = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: userLoggedIn, accessToken, refreshToken },
          "User loggedIn successfully"
        )
      );
  } catch (error) {
    console.log(error.statusCode);
    throw new ApiError(error.statusCode, error);
  }
});

const userLogout = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user?._id, {
      $unset: {
        refreshToken: 1,
      },
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User loggedOut successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while logging out user");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User data fetched successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(403, "Invalid refresh token");
    }

    if (user?.refreshToken !== incomingRefreshToken) {
      throw new ApiError(402, "Refresh token expired");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(decodedToken);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      error.statusCode,
      error || "Something went wrong while refreshig access token"
    );
  }
});

export {
  userRegister,
  userLogin,
  userLogout,
  refreshAccessToken,
  getCurrentUser,
};
