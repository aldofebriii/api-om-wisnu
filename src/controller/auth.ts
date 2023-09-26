import { RequestHandler } from "express";
import ErrorHandling from "../util/errorHandling";
import User from "../model/user";
import Admin from "../model/admin";
import { createHmac } from "crypto";
import jwt from "jsonwebtoken";

interface ILoginInput {
  username: string;
  password: string;
}
export const loggingIn: RequestHandler = async (req, res, next) => {
  if (!req.body)
    return ErrorHandling({
      statusCode: 400,
      message: "Missing Request Body",
      res: res,
    });

  const userInput = req.body as ILoginInput;
  if (!userInput.username || !userInput.password)
    return ErrorHandling({
      statusCode: 400,
      message: "Missing Required Field",
      res: res,
    });
  let foundedUser;
  if (req.path === "/admin") {
    foundedUser = await Admin.findOne({ username: userInput.username });
  } else {
    foundedUser = await User.findOne({ username: userInput.username });
  }
  if (!foundedUser)
    return ErrorHandling({
      statusCode: 404,
      message: "Username not found",
      res: res,
    });

  // const userInput = req.body as ILoginInput;
  // console.log(userInput);
  // if (!userInput.username || !userInput.password)
  //   return ErrorHandling({
  //     statusCode: 400,
  //     message: "Missing Required Field",
  //     res: res,
  //   });

  // const foundedUser = await User.findOne({ username: userInput.username });
  // if (!foundedUser)
  //   return ErrorHandling({
  //     statusCode: 404,
  //     message: "Username not found",
  //     res: res,
  //   });

  const hashedInput = createHmac("sha256", process.env.SECRET_HASH as string)
    .update(userInput.password)
    .digest("hex");

  const passwordValid = foundedUser.password === hashedInput;
  if (!passwordValid)
    return ErrorHandling({
      statusCode: 403,
      message: "Password salah",
      res: res,
    });

  const at = jwt.sign(
    { id: foundedUser._id, role: foundedUser.role, name: foundedUser.bio.name },
    process.env.SECRET_HASH as string
  );

  res.setHeader("Authorization", `Bearer ${at}`);

  return res.status(200).json({
    access_token: at,
  });
};

export default loggingIn;
