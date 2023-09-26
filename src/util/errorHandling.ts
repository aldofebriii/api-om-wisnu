import { Response } from "express";

interface IErrorParams {
    statusCode?: 500 | 400 | 401 | 403 | 404;
    message: string;
}

const ErrorHandling = ({statusCode=500, message='Unexpected error occured'}: IErrorParams) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
};
export default ErrorHandling;