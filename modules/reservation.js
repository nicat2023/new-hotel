import mongoose, { Schema, model } from "mongoose";
const reservationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    checkInDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false }
);

reservationSchema.post("save", async function() {
  const foundUser = await mongoose.model("user").findOne({ _id: this.userId });
  await mongoose.model('room').findOneAndUpdate({roomNumber:this.roomNumber},{$push:{users:foundUser._id}},{new:true})
});



const reservationModel = model("reservation", reservationSchema);
export default reservationModel;
