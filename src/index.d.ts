import { IAdmin } from "./model/admin";
import { IUser } from "./model/user";

declare global  {
    namespace Express {
        export interface Request {
            user?: IUser
            admin?: IAdmin
        }
    }

    export interface Error {
        name: string;
        message: string;
        stack?: string;
        statusCode?: number
    }
}