// Classe qui contiendra des informations sur un livre

import { Author } from "./Author";

export class Book{
    constructor(
        public key: string,
        public isbn: string,
        public title: string,
        public description: string,
        public cover: string,
        public subjects: string[],
        public publishDate: string,
        public author: Author,

    ){}
}