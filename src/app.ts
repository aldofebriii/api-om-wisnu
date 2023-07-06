import express, { Express } from 'express';
import mongoose from 'mongoose';
import dotaenv from 'dotenv';
import { generateSurat } from './controller/surat';

dotaenv.config();
const app: Express = express();

app.get('/surat', generateSurat);

app.get('/ping', (_, res, __) => {
    return res.status(200).json({
        msg: "Server is Alived"
    });
})

mongoose.connect(process.env.MongoURI as string)
.then(()=> {
    app.listen(process.env.PORT, () => {
        console.log(process.env.PORT)
        console.log('Server is connected');
    },);
})
.catch(err => console.log(err));