import { RequestHandler } from "express";
import { TJenisSurat, validateJenisSurat, validateNewUser, validateSAcara, validateSDomisili, validateSKelahiran, validateSPengantar, validateSRenovasi } from "../util/validate";
import ErrorHandling from "../util/errorHandling";
import { IUser } from "../model/user";
import User from '../model/user';
import { createHmac } from 'node:crypto';
import Acara, { IAcara } from "../model/surat/acara";
import Domisili, { IDomisili } from "../model/surat/domisili";
import Kelahiran, { IKelahiran} from "../model/surat/kelahiran";
import Pengantar, { IPengantar } from "../model/surat/pengantar";
import Renovasi, { IRenovasi } from "../model/surat/renovasi";
import { generatorNewSurat, queryJenisSurat } from "../helper/helper";
import { getHari } from "../util/hari";

export const getUser: RequestHandler = async (req, res, next) => {
    try {
        const id = req.user?._id;
        if(!id) throw ErrorHandling({
            statusCode: 400,
            message: "Missing required params"
        });
    
        const foundedUser = await User.findById(id);
        if(!foundedUser) throw ErrorHandling({
            statusCode: 404,
            message: "User not found"
        });
    
        return res.status(200).json(foundedUser)
    } catch(err){
        next(err);
    }; 
};

export const createNewUser: RequestHandler = async (req, res, next) => {
    try {
        if(!req.body) {
            throw ErrorHandling({
                statusCode: 400,
                message: "Request Body is required"
            })
        };
    
        const userBody = req.body as IUser;
        if(!validateNewUser(userBody)) {
            throw ErrorHandling({
                statusCode: 400,
                message: "User is invalid"
            })
        };
        
    
        const hashedPassword = createHmac('sha256', process.env.SECRET_HASH as string).update(userBody.password).digest('hex');
    
        const newUser = new User({...userBody, password: hashedPassword, role: 'user'});
    
        await newUser.save();
        return res.status(201).json(newUser);
    } catch(err){
        next(err);
    };
};

export const getSurat: RequestHandler = async (req, res, next) => {
    try {
        const jenis = queryJenisSurat(req, res);
    if(!jenis) {
        throw ErrorHandling({
            statusCode: 400,
            message: 'Invalid Query'
        })  
    };
    const userId = req.user!._id;
    const suratId = req.params.suratId;
    let foundedSurat;
    if(jenis === 'kelahiran') {
        foundedSurat = suratId ? await Kelahiran.findOne({_id: suratId, userId: userId}) : await Kelahiran.find({userId: userId});
    };

    if(jenis === 'domisili') {
        foundedSurat = suratId ? await Domisili.findOne({_id: suratId, userId: userId}) : await Domisili.find({userId: userId});
    };

    if(jenis === 'pengantar') {
        foundedSurat = suratId ? await Pengantar.findOne({_id: suratId, userId: userId}) : await Pengantar.find({userId: userId});
    };

    if(jenis === 'renovasi') {
        foundedSurat = suratId ? await Renovasi.findOne({_id: suratId, userId: userId}) :await Renovasi.find({userId: userId});
    };

    if(jenis === 'acara') {
        foundedSurat = suratId ? await Acara.findOne({_id: suratId, userId: userId}) : await Acara.find({userId: userId});
    };

    if(!foundedSurat) {
        throw ErrorHandling({
            message: 'Surat not found',
            statusCode: 404
        });
    };

    return res.status(200).json(foundedSurat);
    } catch(err){
        next(err);
    };
};

export const deleteSurat: RequestHandler = async (req, res, next) => {
    try {
        const jenis = queryJenisSurat(req, res);
        if(!jenis) {
            throw ErrorHandling({
                statusCode: 400,
                message: 'Invalid Query'
            })  
        };
        const userId = req.user!._id;
        const suratId = req.params.suratId;
        let deletedSurat;
        if(jenis === 'kelahiran') {
            deletedSurat = await Kelahiran.deleteOne({_id: suratId, userId: userId});
        };
    
        if(jenis === 'domisili') {
            deletedSurat = await Domisili.deleteOne({_id: suratId, userId: userId});
        };
    
        if(jenis === 'pengantar') {
            deletedSurat = await Pengantar.deleteOne({_id: suratId, userId: userId});
        };
    
        if(jenis === 'renovasi') {
            deletedSurat = await Renovasi.deleteOne({_id: suratId, userId: userId});
        };
    
        if(jenis === 'acara') {
            deletedSurat = await Acara.deleteOne({_id: suratId, userId: userId});
        };
    
        if(deletedSurat?.deletedCount === 0) {
            throw ErrorHandling({
                message: "Delete failed",
                statusCode: 404
            });
        };
        console.log(deletedSurat);
        return res.status(200).json(deletedSurat);
    } catch(err){
        next(err);
    };
};

export const generateSurat: RequestHandler = async (req, res, next) => {
    try {
        const jenis = queryJenisSurat(req, res);
        if(!jenis) {
            throw ErrorHandling({
                statusCode: 400,
                message: 'Invalid Query'
            })  
        };
        const suratId = req.params.suratId;
        let surat;
        if(jenis === 'kelahiran') {
            if(!validateSKelahiran(req)){
                throw ErrorHandling({
                    statusCode: 400,
                    message: 'Missing required fields',
                })
            };
            surat = await generatorNewSurat<IKelahiran>(req, Kelahiran, suratId);
        };
    
        if(jenis === 'domisili') {
            if(!validateSDomisili(req)){
                throw ErrorHandling({
                    statusCode: 400,
                    message: 'Missing required body field in ' + jenis,
                })
            };
            surat = await generatorNewSurat<IDomisili>(req, Domisili, suratId);
        };
    
        if(jenis === 'pengantar') {
            if(!validateSPengantar(req)){
                throw ErrorHandling({
                    statusCode: 400,
                    message: 'Missing required fields',
                })
            };
            surat = await generatorNewSurat<IPengantar>(req, Pengantar, suratId);
        };
    
        if(jenis === 'renovasi') {
            if(!validateSRenovasi(req)){
                throw ErrorHandling({
                    statusCode: 400,
                    message: 'Missing required fields',
                })
            };
            surat = await generatorNewSurat<IRenovasi>(req, Renovasi, suratId);
        };
    
        if(jenis === 'acara') {
            if(!validateSAcara(req)){
                throw ErrorHandling({
                    statusCode: 400,
                    message: 'Missing required fields',
                })
            };
            //tindak lanjut
            req.body as IAcara;
            const { date } = req.body;
            req.body.day = getHari(new Date(date).getDay());
            req.body.time = `${new Date(date).getHours()} : ${new Date(date).getMinutes()}  - Selesai `
            surat = await generatorNewSurat<IAcara>(req, Acara, suratId);
        };
    
        return res.status(200).json(surat);
    } catch(err){
        next(err);
    };
};