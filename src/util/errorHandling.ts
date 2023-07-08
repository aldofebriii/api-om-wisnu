import { Response } from "express";

interface IErrorParams {
    statusCode: 500 | 400 | 401 | 403 | 404;
    message: string;
    res: Response
}

const ErrorHandling = ({statusCode=500, message='Unexpected error occured', res}: IErrorParams) => {
    return res.status(statusCode).json({
        message: message
    })
};
export default ErrorHandling;