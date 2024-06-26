import mongoose from "npm:mongoose@8.4.3";
import { Person } from "../types.ts";

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

export type PersonModelType =
  & mongoose.Document
  & Omit<Person, "id" | "pets">;

PersonSchema.post("findOneAndDelete", async function (doc: PersonModelType) {
  await mongoose.models.Pet.deleteMany({ owner: doc._id });
});

export const PersonModel = mongoose.model<PersonModelType>(
  "Person",
  PersonSchema,
);
