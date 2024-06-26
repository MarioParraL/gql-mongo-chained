import mongoose from "npm:mongoose@8.4.3";
import { Pet } from "../types.ts";

const Schema = mongoose.Schema;

const PetSchema = new Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: "Person" },
});

export type PetModelType =
  & mongoose.Document
  & Omit<Pet, "id" | "owner">
  & { owner: mongoose.Types.ObjectId };

//validate if owner exist
PetSchema.path("owner").validate(async function (
  value: mongoose.Types.ObjectId,
) {
  if (value === this.owner) {
    return true;
  }

  const owner = await mongoose.models.Person.findById(value);
  if (!owner) {
    throw new Error(`Owner with ${value} does not exist`);
  }
  return true;
});

export const PetModel = mongoose.model<PetModelType>(
  "Pet",
  PetSchema,
);
