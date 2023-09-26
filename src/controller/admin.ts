import { RequestHandler } from "express";
import ErrorHandling from "../util/errorHandling";
import User from "../model/user";
import Acara from "../model/surat/acara";
import Domisili from "../model/surat/domisili";
import Kelahiran from "../model/surat/kelahiran";
import Pengantar from "../model/surat/pengantar";
import Renovasi from "../model/surat/renovasi";

export const adminGetAllUser: RequestHandler = async (req, res, next) => {
  const reqAdmin = req.admin;
  // if (req.body)
  //   return ErrorHandling({
  //     statusCode: 403,
  //     message: "Invalid Cookie",
  //     res: res,
  //   });

  const users = await User.find();

  return res.status(200).json(users);
};

export const adminGetAllSurat: RequestHandler = async (req, res, next) => {
  const reqAdmin = req.admin;
  // if (req.body)
  //   return ErrorHandling({
  //     statusCode: 403,
  //     message: "Invalid Cookie",
  //     res: res,
  //   });

  const result = [];
  const acaras = await Acara.find({});
  result.push(...acaras);

  const domisili = await Domisili.find({});
  result.push(...domisili);

  const kelahiran = await Kelahiran.find({});
  result.push(...kelahiran);

  const pengantar = await Pengantar.find({});
  result.push(...pengantar);

  const renovasi = await Renovasi.find({});
  result.push(...renovasi);

  return res.status(200).json(result);
};
