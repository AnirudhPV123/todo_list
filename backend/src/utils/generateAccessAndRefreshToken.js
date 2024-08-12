import { CustomError } from './CustomError.js';
import { User } from '../models/users.model.js';

const generateAccessAndRefreshToken = async ({ userId }) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new CustomError(500, 'Something went wrong while generating access and refresh token');
  }
};

export { generateAccessAndRefreshToken };
