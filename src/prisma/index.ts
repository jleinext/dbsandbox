import { PrismaClient } from "@prisma/client";
import { Author, AuthorId, PersonalInformation } from "../domain";

async function main() {
  const db = new PrismaClient();

  // La migration de la base a été faite avec `npx prisma migrate up --experimental`
  // et le client ci-dessus généré avec `npx prisma generate`

  // Manipulation de notre objet domaine ...
  const author = new Author(
    new AuthorId("42"),
    new PersonalInformation("john", "doe")
  );

  try {
    await db.author.create({
      data: author.takeSnapshot(), // Cela fonctionne car l'interface du snapshot correspond
    });
  } catch {
    console.log("should already exists");
  }

  // Récupération depuis la base
  const model = await db.author.findOne({ where: { id: "42" } });

  if (!model) {
    throw new Error("should exists!");
  }

  console.log(Author.fromSnapshot(model));

  await db.disconnect();
}

main();
