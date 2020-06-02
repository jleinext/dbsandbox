/**
 * Domaine extrèmement simple permettant de tester les différentes solutions
 * avec une approche orientée DDD, objet valeurs et entités.
 */

export class AuthorId {
  constructor(readonly value: string) {}
}

export class PersonalInformation {
  constructor(readonly firstName: string, readonly lastName: string) {}
}

export interface AuthorSnapshot {
  id: string;
  firstName: string;
  lastName: string;
}

export class Author {
  get id() {
    return this._id;
  }

  get info() {
    return this._info;
  }

  constructor(private _id: AuthorId, private _info: PersonalInformation) {}

  /**
   * Récupère un instantanné de l'état de l'entité. Cet état est en lecture seule
   * et représente une implémentation du Memento pattern. De cette manière, notre
   * objet métier peut préserver son encapsulation et ces behaviors mais permettre
   * à un tiers de persister une capture de son état.
   */
  takeSnapshot(): Readonly<AuthorSnapshot> {
    return {
      id: this.id.value,
      firstName: this.info.firstName,
      lastName: this.info.lastName,
    };
  }

  /**
   * Recré un objet métier à partir d'un instantanné.
   */
  static fromSnapshot(snapshot: Readonly<AuthorSnapshot>): Author {
    return new Author(
      new AuthorId(snapshot.id),
      new PersonalInformation(snapshot.firstName, snapshot.lastName)
    );
  }
}
