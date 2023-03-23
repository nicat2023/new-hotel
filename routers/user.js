import { Router } from "express";
import roomModel from "../modules/room.js";

const userRouter = Router();

userRouter.get("/room", async (req, res) => {
  const isActiveRoom = await roomModel.find({ isActive: true });
  return res.status(200).send(isActiveRoom);
});

userRouter.get("/room/:id", async (req, res) => {
  const id = req.params.id;
  const getRoom = await roomModel.findById({ _id: id });
  return res.status(200).send(getRoom);
});

userRouter.get("/availablerooms", async (req, res) => {
  const isAvailablerooms = await roomModel.find({ availability: true });
  return res.sendStatus(200).send(isAvailablerooms);
});

export default userRouter;
