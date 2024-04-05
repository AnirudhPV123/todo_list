import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref:"User"
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
