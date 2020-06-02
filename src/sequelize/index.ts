import { Sequelize, STRING, Model } from "sequelize";
import {
  Author,
  AuthorId,
  PersonalInformation,
  AuthorSnapshot,
} from "../domain";

class AuthorModel extends Model {}

async function main() {
  const db = new Sequelize("sqlite:sequelize.db");

  // Définition du schéma
  AuthorModel.init(
    {
      id: {
        type: STRING,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: STRING,
        allowNull: false,
      },
      lastName: {
        type: STRING,
        allowNull: false,
      },
    },
    { sequelize: db }
  );

  // Création des tables, on utiliserait ici les migrations
  await db.sync();

  // Manipulation de notre objet domaine ...
  const author = new Author(
    new AuthorId("42"),
    new PersonalInformation("john", "doe")
  );

  // Et persistance !
  try {
    await AuthorModel.create(author.takeSnapshot());
  } catch {
    console.log("should already exists");
  }

  // // Et récupération
  const model = await AuthorModel.findOne({ where: { id: "42" } });

  // Il faut par contre reconstruire l'objet du domaine par la suite à partir d'un
  // snapshot
  console.log(Author.fromSnapshot(model));
}

main();
