import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");



    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    let decodedtoken ;
    try {
  decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      throw new ApiError(402, "Token expired");
    }



    const user = await User.findById(decodedtoken?._id).select(
      "-password -refreshToken"
    );



    if (!user) {
      throw new ApiError(403, "Invalid Access Token");
    } 

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw new ApiError(error.statusCode, error || "Invalid access token");
  }
});
