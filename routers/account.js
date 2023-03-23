import { Router } from "express";
import userModel from "../modules/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const accountRouter = Router();

export const jwt_secret = "Nicat";

accountRouter.post("/sign-up", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPass = await bcrypt.hash(password, await bcrypt.genSalt());
  const creatUser = await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPass,
  });
  res.send(creatUser);
});

accountRouter.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(403).send("email sehvdir");
  }
  const pastRight = await bcrypt.compare(password, user.password);
  if (!pastRight) {
    return res.status(403).send("sifre sehvdir");
  }
  const token = jwt.sign({ email, role: user.role }, jwt_secret);
  return res.send(token);
});

export default accountRouter