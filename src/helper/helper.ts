import { Request, Response } from "express";
import { TJenisSurat } from "../util/validate";
import ErrorHandling from "../util/errorHandling";
import { validateJenisSurat } from "../util/validate";
import mongoose from "mongoose";

export const queryJenisSurat = ( req: Request, res: Response ) => {
    let jenis: TJenisSurat;
    if(!req.query.jenis) {
        return false;
    };

    //Validate tambahan
    if(!validateJenisSurat(req.query.jenis as string)) {
        return false;
    };
    jenis = req.query.jenis as TJenisSurat;
    return jenis;
};

export const generatorNewSurat = async <T> (req: Request, Surat: mongoose.Model<T>, suratId?: string) => {
    const userId = req.user?._id;
    req.body as T;
    let surat;
    if(suratId) {
        surat = await Surat.updateOne({_id: suratId, userId: userId}, {...req.body, userId: userId});
    } else {
        surat = new Surat({...req.body, userId: userId});
        await surat.save();
    };

    if(!surat) {
        return null;
    };

    return surat;
};