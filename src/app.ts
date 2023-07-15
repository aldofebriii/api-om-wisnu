import express, { Express } from 'express';
import mongoose from 'mongoose';
import dotaenv from 'dotenv';
import { createNewUser, generateSurat, getSurat, getUser, deleteSurat } from './controller/main';
import { adminGetAllSurat, adminGetAllUser} from './controller/admin'
import loggingIn from './controller/auth';
import fs from 'fs';
import path from 'path';
import https from 'https';
import {verifiedUser, verifiedAdmin} from './ middleware/protected';
import cors from 'cors';
import helmet from 'helmet';

dotaenv.config();

const key = fs.readFileSync(path.join(__dirname, '..', 'selfsigned.key'));
const cert = fs.readFileSync(path.join(__dirname, '..', 'selfsigned.crt'));
const app: Express = express();

const server = https.createServer({
    key: key,
    cert: cert
}, app);

const whiteListOrigin = ['http://localhost:3000', 'https://localhost:3000', 'https://127.0.0.1:5500', 'http://127.0.0.1:5500']
app.use(cors({
    origin: (origin, callback) => {
        if(whiteListOrigin.indexOf(origin as string) >  -1 ) {
            callback(null, true)
        } else {
            callback(new Error("Not Allowed By Cors"))
        };
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Set-Cookie', 'Authorization', 'Accept'],
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

app.use(helmet());
app.use(express.json());

//Admin
app.get('/admin/surat', verifiedAdmin, adminGetAllSurat);
app.get('/admin/user', verifiedAdmin, adminGetAllUser);
app.post('/admin/user', verifiedAdmin, createNewUser);
app.post('/admin', loggingIn);
//Surat
app.get('/surat/:suratId', verifiedUser, getSurat);
app.get('/surat', verifiedUser, getSurat);
app.delete('/surat/:suratId', verifiedUser, deleteSurat);
app.put('/surat/:suratId', verifiedUser, generateSurat);
app.post('/surat', verifiedUser, generateSurat);
//User
app.get('/user', verifiedUser ,getUser);
//Auth
app.post('/login', loggingIn);
//Util
app.get('/', (_, res, __) => {
    return res.status(200).json({
        msg: "Server is Alived"
    });
})

mongoose.connect(process.env.MongoURI as string)
.then(()=> {
    server.listen(process.env.PORT, () => console.log("Server is Connected"));
})
.catch(err => console.log(err));    