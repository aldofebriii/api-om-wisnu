import { IAdmin } from "./model/admin";
import { IUser } from "./model/user";

declare global  {
    namespace Express {
        export interface Request {
            user?: IUser
            admin?: IAdmin
        }
    }
}