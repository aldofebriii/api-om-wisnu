import { RequestHandler } from "express";
import { TJenisSurat, validateJenisSurat, validateNewUser } from "../util/validate";
import ErrorHandling from "../util/errorHandling";
import { UserDocs } from "../model/user";
import User from '../model/user';

import { BinaryLike, createHmac } from 'node:crypto';


export const createNewUser: RequestHandler = async (req, res, next) => {
    if(req.body) {
        return ErrorHandling({
            statusCode: 400,
            message: "Request Body is required",
            res: res
        })
    };

    const userBody = req.body as typeof UserDocs;
    if(!validateNewUser(userBody)) {
        return ErrorHandling({
            statusCode: 400,
            message: "User is invalid",
            res: res
        })
    };
    

    const hashedPassword = createHmac('sha256', process.env.SECRET_HASH as string).update('sss').digest('hex');

    const newUser = new User({...userBody, password: hashedPassword});

    await newUser.save();
    return res.status(201).json(newUser);
};

export const generateSurat: RequestHandler = (req, res, next) => {
    let jenis: TJenisSurat;
    if(!req.query.jenis) {
        return ErrorHandling({
            statusCode: 400,
            message: 'Query jenis is required',
            res: res
        });
    };

    //Validate tambahan
    if(!validateJenisSurat(req.query.jenis as string)) {
        return ErrorHandling({
            statusCode: 400,
            message: 'Invalid Query',
            res: res
        })
    };

    jenis = req.query.jenis as TJenisSurat;
    return res.status(200).json(jenis);
};