
// Classe qui contiendra des informations sur l'auteur

export class Author {

    constructor(
      public key:string,
      public name: string,
      public photo: string,
      public biography: string,
      public birthDate: string,
      public topSubjects: string,
      ){}
}