export type TJenisSurat = 'kelahiran'| 'domisili'| 'acara'| 'pengantar'| 'renovasi';
import { IUser } from "../model/user";
import { Request } from "express";

export const validateJenisSurat = (qry: string) => {
    return ['kelahiran', 'domisili', 'acara', 'pengantar', 'renovasi'].indexOf(qry) > -1
};

export const validateSAcara = ({body}: Request) => {
    return 'date' in body && 'eventManager' in body && 'place' in body;
};

export const validateSDomisili = ({body}: Request) => {
    return 'address' in body && 'birthplace' in body && 'country' in body && 'gender' in body && 'job' in body && 'name' in body && 'religion' in body && 'status' in body; 
};

export const validateSKelahiran = ({body}: Request) => {
    return 'address' in body && 'birthplace' in body && 'childOrder' in body && 'fatherName' in body && 'motherName' in body && 'gender' in body && 'job' in body && 'name' in body; 
};

export const validateSPengantar = ({body}: Request) => {
    return 'address' in body && 'birthplace' in body &&
    'country' in body && 'religion' in body && 'report' in body && 'status' in body && 'nik' in body && 'name' in body; 
};

export const validateSRenovasi = ({body}: Request) => {
    return 'address' in body && 'name' in body && 'noHp' in body && 'renovAddress' in body;
};

export const validateNewUser = (user: IUser) => {
    let condition = true;
    if( 
        !user ||
        !user.username ||
        !user.password || 
        !user.bio ||
        !user.bio.address ||
        !user.bio.birthplace ||
        !user.bio.country ||
        !user.bio.job || 
        !user.bio.name ||
        !user.bio.nik ||
        !user.bio.noHp || 
        !user.bio.religion ||
        !user.bio.status
    ) condition = false;
    return condition;
};