import { Router } from "express";
import reservationModel from "../modules/reservation.js";
import roomModel from "../modules/room.js";
import userModel from "../modules/user.js";
const adminRouter = Router();

adminRouter.post("/room", async (req, res) => {
  const body = req.body;
  const newRoom = await roomModel.create(body);
  res.send(newRoom);
});

adminRouter.put("/room/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updateRoom = await roomModel.findOneAndUpdate(
    { _id: id },
    {
      $set: body,
    },
    { new: true }
  );
  res.send(updateRoom);
});

adminRouter.delete("/room/:id", async (req, res) => {
  const { id } = req.params;
  const updateRoom = await roomModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: { isActive: false },
    },
    { new: true }
  );
  res.send(updateRoom);
});



adminRouter.post('/adminRoutereserveRoom', async (req, res) => {
  const { userId, roomNumber, checkInDate, checkOutDate } = req.body
  const userIdExist = await userModel.findOne({ _id: userId })
  if (!userIdExist) {
      return res.send('User not found!')
  }
  const isRoomExist = await roomModel.findOne({ roomNumber })
  if (!isRoomExist || isRoomExist.isActive === false || isRoomExist.users.length === isRoomExist.occupancy) {
      return res.send('Room not found or not active or is full !')
  }
  const checinDate = new Date(`${checkInDate}`)
  const checkoutDate = new Date(`${checkOutDate}`)
  const differenceDay = (checkoutDate - checinDate) / 86400000
  const totalAmount = isRoomExist.price * differenceDay
  const newReserv = await reservationModel.create({ userId, roomNumber, checkInDate, checkOutDate, totalAmount })
  await roomModel.findOneAndUpdate({ roomNumber }, { $set: { availability: false } }, { new: true })
  res.status(200).send(newReserv)
})



adminRouter.get('/reservedRooms', async (req, res) => {
  const allResvervedRooms = await reservModel.find({ isActive: true })
  res.status(200).send(allResvervedRooms)
})

adminRouter.put('/cancelReserve/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params
  const reserveRoomExist = reservModel.findOne({ roomNumber })
  if (!reserveRoomExist) {
      return res.status(404).send('room not is reserved!')
  }
  const updateReservedRoom = await reservModel.findOneAndUpdate({ roomNumber }, { $set: { isActive: false } }, { new: true })
  res.status(200).send(updateReservedRoom)
})


adminRouter.put('/makeRoomAvailable/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params
  const changedAvailableRoom = await roomModel.findOneAndUpdate({ roomNumber }, { $set: { availability: true, users: [] } }, { new: true })
  res.status(200).send(changedAvailableRoom)
})


export default adminRouter;


