# sandbox persistance

Quelques essais avec différentes librairies de persistence.

## Lancement

```console
$ npm i
$ npm run sequelize
$ npm run typeorm
$ npm run knex
$ # Pour prisma, c'est différent, voir ci-dessous
```

## Prisma

Pour prisma, il vous faudra exécuter la commande `npx prisma migrate up --experimental` au sein du répertoire `/src/prisma/` (sur mon poste, je dois lancer la commande 2 fois sinon il reste bloqué juste après la création de la base...).

Ensuite on génère le client avec `npx prisma generate` toujours dans le même répertoire.

Et ensuite on peut lancer `npx ts-node index.ts`.
