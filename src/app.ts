import express, { Express } from "express";
import mongoose from "mongoose";
import dotaenv from "dotenv";
import {
  createNewUser,
  generateSurat,
  getSurat,
  getUser,
  deleteSurat,
} from "./controller/main";
import loggingIn from "./controller/auth";
import fs from "fs";
import path from "path";
import https from "https";
import verifiedUser from "./ middleware/protected";
import cors from "cors";
import helmet from "helmet";

dotaenv.config();

const key = fs.readFileSync(path.join(__dirname, "..", "selfsigned.key"));
const cert = fs.readFileSync(path.join(__dirname, "..", "selfsigned.crt"));
const app: Express = express();

const server = https.createServer(
  {
    key: key,
    cert: cert,
  },
  app
);

app.use(cors());
app.use(helmet());
app.use(express.json());
//Surat
app.get("/surat/:suratId", verifiedUser, getSurat);
app.get("/surat", verifiedUser, getSurat);
app.delete("/surat/:suratId", verifiedUser, deleteSurat);
app.put("/surat/:suratId", verifiedUser, generateSurat);
app.post("/surat", verifiedUser, generateSurat);
//User
app.get("/user", verifiedUser, getUser);
app.post("/user", createNewUser);
//Auth
app.post("/login", loggingIn);
//Util
app.get("/", (_, res, __) => {
  return res.status(200).json({
    msg: "Server is Alived",
  });
});

mongoose
  .connect(process.env.MongoURI as string)
  .then(() => {
    server.listen(process.env.PORT, () => console.log("Server is Connected"));
  })
  .catch((err) => console.log(err));
