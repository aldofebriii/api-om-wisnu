import { RequestHandler } from "express";
import ErrorHandling from "../util/errorHandling";
import User from "../model/user";
import Acara, { IAcara } from "../model/surat/acara";
import Domisili, { IDomisili } from "../model/surat/domisili";
import Kelahiran, { IKelahiran } from "../model/surat/kelahiran";
import Pengantar, { IPengantar } from "../model/surat/pengantar";
import Renovasi, { IRenovasi } from "../model/surat/renovasi";

export const adminGetAllUser: RequestHandler = async (req, res, next) => {
    try {
        const reqAdmin = req.admin;
        if (!reqAdmin)
          throw ErrorHandling({
            statusCode: 403,
            message: "Invalid Cookie"
          });
      
        const users = await User.find();
      
        return res.status(200).json(users);
    } catch(err){
        next(err);
    };
};

export const adminGetAllSurat: RequestHandler<{}, {}, {}, {}> = async (req, res, next) => {
    try {
        const reqAdmin = req.admin;
        if (!reqAdmin)
            throw ErrorHandling({
            statusCode: 403,
            message: "Invalid Cookie"
            });

        const result: Record<'acara' | 'domisili' | 'kelahiran' | 'pengantar' | 'renovasi', IAcara[] | IDomisili[] | IKelahiran[] | IPengantar[] | IRenovasi[]> = {acara: [], domisili: [], kelahiran: [], pengantar: [], renovasi: []};
        const acaras = await Acara.find({});
        result.acara = acaras;

        const domisili = await Domisili.find({});
        result.domisili = domisili;

        const kelahiran = await Kelahiran.find({});
        result.kelahiran = kelahiran;

        const pengantar = await Pengantar.find({});
        result.pengantar = pengantar;

        const renovasi = await Renovasi.find({});
        result.renovasi = renovasi;

        return res.status(200).json(result);
    } catch(err){
        next(err);
    };
};
