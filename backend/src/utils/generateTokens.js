import { CustomError } from './CustomError.js';
import { User } from '../models/users.model.js';

const generateTokens = async ({ userId, isGenerateRefreshToken = false }) => {
  try {
    const user = await User.findById(userId);

    // Generate access token
    const accessToken = user.generateAccessToken();

    if (isGenerateRefreshToken) {
      // Generate refresh token if requested
      const refreshToken = user.generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });

      // Return both access and refresh token
      return { accessToken, refreshToken };
    }

    // Return only access token
    return { accessToken };
  } catch (error) {
    throw new CustomError(500, 'Something went wrong while generating access and refresh token');
  }
};

export { generateTokens };
