import { RequestHandler } from "express";
import ErrorHandling from "../util/errorHandling";
import jwt from "jsonwebtoken";
import User from "../model/user";
import Admin from "../model/admin";

export const verifiedUser: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ErrorHandling({
      statusCode: 401,
      message: "Invalid or missing bearer token",
      res: res,
    });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.SECRET_HASH as string) as {
      id: string;
    };

    if (!decoded.id) {
      return ErrorHandling({
        statusCode: 403,
        message: "Invalid token",
        res: res,
      });
    }

    const validUser = await User.findById(decoded.id);

    if (!validUser) {
      return ErrorHandling({
        statusCode: 403,
        message: "Invalid token",
        res: res,
      });
    }

    req.user = validUser;
    next();
  } catch (error) {
    return ErrorHandling({
      statusCode: 401,
      message: "Invalid token",
      res: res,
    });
  }
};

export const verifiedAdmin: RequestHandler = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return ErrorHandling({
      statusCode: 400,
      message: "No Bearer Token Provided",
      res: res,
    });
  }
  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    return ErrorHandling({
      statusCode: 400,
      message: "No Bearer Token Provided",
      res: res,
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_HASH as string) as {
      id: string;
    };

    if (!decoded.id) {
      return ErrorHandling({
        statusCode: 403,
        message: "Invalid Token",
        res: res,
      });
    }
    const validAdmin = await Admin.findById(decoded.id);
    if (!validAdmin || validAdmin.role !== "admin") {
      return ErrorHandling({
        statusCode: 403,
        message: "Invalid Token",
        res: res,
      });
    }
    req.admin = validAdmin;
    next();
  } catch (err) {
    return ErrorHandling({
      statusCode: 403,
      message: "Token Verification Failed",
      res: res,
    });
  }
};

