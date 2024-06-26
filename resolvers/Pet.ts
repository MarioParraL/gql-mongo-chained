import { GraphQLError } from "graphql";
import { PetModelType } from "../db/pet.ts";
import { PersonModel, PersonModelType } from "../db/person.ts";
export const Pet = {
  owner: async (parent: PetModelType): Promise<PersonModelType> => {
    const person = await PersonModel.findById(parent.owner).exec();
    if (!person) {
      throw new GraphQLError(`No person with id ${parent.id}`, {
        extensions: { code: "NOT FOUNDED" },
      });
    }
    return person;
  },
};
