import {
  createConnection,
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
} from "typeorm";
import {
  AuthorSnapshot,
  Author,
  AuthorId,
  PersonalInformation,
} from "../domain";

@Entity()
class AuthorModel extends BaseEntity implements AuthorSnapshot {
  @PrimaryColumn()
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;
}

async function main() {
  const db = await createConnection({
    entities: [AuthorModel],
    type: "sqlite",
    database: "./typeorm.db",
  });

  // Création des tables, on utiliserait ici les migrations
  await db.synchronize();

  // Manipulation de notre objet domaine ...
  const author = new Author(
    new AuthorId("42"),
    new PersonalInformation("john", "doe")
  );

  // Insertion
  try {
    await AuthorModel.insert(author.takeSnapshot());
  } catch {
    console.log("should already exists");
  }

  // Et récupération
  const model = await AuthorModel.findOneOrFail("42");

  console.log(Author.fromSnapshot(model));
}

main();
