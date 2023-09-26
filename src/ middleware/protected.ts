import { RequestHandler } from "express";
import ErrorHandling from "../util/errorHandling";
import jwt from "jsonwebtoken";
import User from "../model/user";
import Admin from "../model/admin";

export const verifiedUser: RequestHandler = async (req, res, next) => {
try {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw ErrorHandling({
      message: "Invalid or missing bearer token"
    });
  }

  const token = authHeader.substring(7);

    const decoded = jwt.verify(token, process.env.SECRET_HASH as string) as {
      id: string;
    };

    if (!decoded.id) {
      throw ErrorHandling({
        statusCode: 403,
        message: "Invalid token",
      });
    }

    const validUser = await User.findById(decoded.id);

    if (!validUser) {
      throw ErrorHandling({
        statusCode: 403,
        message: "Invalid token",
      });
    }

    req.user = validUser;
    next();
  } catch (err:any) {
    err.statusCode = 401;
    next(err);
  }
};

export const verifiedAdmin: RequestHandler = async (req, res, next) => {
    try {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    throw ErrorHandling({
      statusCode: 400,
      message: "No Bearer Token Provided"
    });
  }
  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    throw ErrorHandling({
      statusCode: 400,
      message: "No Bearer Token Provided"
    });
  }
    const decoded = jwt.verify(token, process.env.SECRET_HASH as string) as {
      id: string;
    };

    if (!decoded.id) {
      throw ErrorHandling({
        message: "Invalid Token"
      });
    };

    console.log(decoded);
    const validAdmin = await Admin.findById(decoded.id);
    if (!validAdmin || validAdmin.role !== "admin") {
      throw ErrorHandling({
        message: "Invalid Token"
      });
    }
    req.admin = validAdmin;
    next();
  } catch (err: any) {
    err.statusCode = 403;
    next(err);
  }
};

