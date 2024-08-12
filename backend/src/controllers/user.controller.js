import { asyncHandler } from '../utils/asyncHandler.js';
import { CustomError } from '../utils/CustomError.js';
import { CustomResponse } from '../utils/CustomResponse.js';
import { User } from '../models/users.model.js';
import jwt from 'jsonwebtoken';
import { loginSchema, registerSchema } from '../validators/userValidators.js';
import { cookieConfig as options } from '../config/cookieConfig.js';
import { generateAccessAndRefreshToken } from '../utils/generateAccessAndRefreshToken.js';

// User Registration
const userRegister = asyncHandler(async (req, res) => {
  const {
    error,
    value: { name, email, password },
  } = registerSchema.validate(req.body);

  if (error) {
    throw new CustomError(400, error.details[0].message);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CustomError(409, 'User with this email already exist.');
  }

  const createdUser = await User.create({
    name,
    email,
    password,
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken({
    userId: createdUser._id,
  });

  // Store the refresh token in DB
  createdUser.refreshToken = refreshToken;
  await createdUser.save;

  // Remove password and refreshToken before sending to frontend
  createdUser.password = undefined;
  createdUser.refreshToken = undefined;

  return res
    .status(201)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(new CustomResponse(201, createdUser, 'User registered successfully.'));
});

// User Login
const userLogin = asyncHandler(async (req, res) => {
  const {
    error,
    value: { email, password },
  } = loginSchema.validate(req.body);

  if (error) {
    throw new CustomError(400, error.details[0].message);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError(404, 'User not found.');
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new CustomError(401, 'Invalid Password.');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken({ userId: user._id });

  // Store refresh token in DB
  user.refreshToken = refreshToken;
  await user.save;

  user.password = undefined;
  user.refreshToken = undefined;

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(new CustomResponse(200, user, 'User logged in successfully.'));
});

// User Logout
const userLogout = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;

  await User.findByIdAndUpdate(userId, {
    $unset: {
      refreshToken: 1,
    },
  });

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new CustomResponse(200, {}, 'User logged out successfully.'));
});

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  console.log('refresh:', incomingRefreshToken);

  if (!incomingRefreshToken) {
    throw new CustomError(401, 'Refresh token required.');
  }

  const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

  console.log('refresht', decodedToken);

  const user = await User.findById(decodedToken._id);

  if (!user || user?.refreshToken !== incomingRefreshToken) {
    throw new CustomError(403, 'Invalid or expired refresh token.');
  }

  const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken({
    userId: user._id,
  });

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', newRefreshToken, options)
    .json(new CustomResponse(200, 'Access token refreshed successfully'));
});

export { userRegister, userLogin, userLogout, refreshAccessToken };
