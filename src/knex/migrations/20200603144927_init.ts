import * as Knex from "knex";

/**
 * Définissez ici les différentes opérations à lancer pour migrer la base de
 * données en avant.
 */
export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable("authors", (builder) => {
    builder.string("id").primary();
    builder.string("firstName");
    builder.string("lastName");
  });
}

/**
 * Et ici les opérations en cas de rollback pour revenir à la version précédente.
 */
export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable("authors");
}
