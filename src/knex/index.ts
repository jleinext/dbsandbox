import knex from "knex";
import {
  Author,
  AuthorId,
  PersonalInformation,
  AuthorSnapshot,
} from "../domain";

async function main() {
  const db = knex({
    client: "sqlite3",
    connection: "./knex.db",
    debug: true, // Possibilité de debug facilement les requêtes qui entrent et sortent
  });

  // Dans une vraie application, on passerait par des migrations de schémas
  if (!(await db.schema.hasTable("authors"))) {
    await db.schema.createTable("authors", (builder) => {
      builder.string("id").primary();
      builder.string("firstName");
      builder.string("lastName");
    });
  }

  // Manipulation de notre objet domaine ...
  const author = new Author(
    new AuthorId("42"),
    new PersonalInformation("john", "doe")
  );

  // Persistance
  try {
    await db<AuthorSnapshot>("authors").insert(author.takeSnapshot());
  } catch {
    console.log("should already exists");
  }

  // Et récupération
  const model = await db<AuthorSnapshot>("authors").where({ id: "42" }).first();

  if (!model) {
    throw new Error("should exists!");
  }

  console.log(Author.fromSnapshot(model));
}

main();
