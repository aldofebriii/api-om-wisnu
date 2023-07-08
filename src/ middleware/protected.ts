import { RequestHandler } from "express";
import ErrorHandling from "../util/errorHandling";
import jwt from 'jsonwebtoken';
import User from "../model/user";


const verifiedUser: RequestHandler = async (req, res, next) => {
    const cookies = req.headers.cookie;
    if(!cookies) return ErrorHandling({
        statusCode: 400,
        message: "No Cookies Provided",
        res: res
    });
    const at = cookies.split('=')[1];
    if(!at) return ErrorHandling({
        statusCode: 400,
        message: "No Access Token",
        res: res
    });

    const decoded = jwt.verify(at, process.env.SECRET_HASH as string) as {id: string};
    if(!decoded.id) return ErrorHandling({
        statusCode: 403,
        message: "Invalid Token",
        res: res
    });

    const validUser = await User.findById(decoded.id);
    if(!validUser) return ErrorHandling({
        statusCode: 403,
        message: "Invalid Token",
        res: res
    });
    req.user = validUser
    next();
};

export default verifiedUser;