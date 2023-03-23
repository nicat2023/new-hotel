import jwt from "jsonwebtoken";
import { jwt_secret } from "../routers/account.js";

const authMiddleWare = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(404).send("Token yoxdur!");
  }
  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) {
      return res.status(403).send("Token yanlisdir");
    }
    if (user.role !== "admin") {
      return res.status(403).send("Sen admin deyilsen!");
    }
    req.user = user;
    next();
  });
};

export default authMiddleWare;
