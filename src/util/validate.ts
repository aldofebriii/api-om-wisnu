export type TJenisSurat = 'kelahiran'| 'domisili'| 'acara'| 'pengantar'| 'renovasi';
import { UserDocs } from "../model/user";

export const validateJenisSurat = (qry: string) => {
    return ['kelahiran', 'domisili', 'acara', 'pengantar', 'renovasi'].indexOf(qry) > -1
};


export const validateNewUser = (user: typeof UserDocs) => {
    let condition = true;
    if( 
        !user.username ||
        !user.password || 
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