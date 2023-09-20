// Classe qui contiendra des informations sur un livre

import { Author } from "./Author";

export class Book{
    constructor(
        public key : string,
        public title ?: string,
       
        public cover ?: string,
        public description ?: string,
        public authorKey ?: string,
        public authorName ?: string,
        public subjects ?: string[],
        public publishDate ?: string,
        public nbPages ?:string,
        public publishers ?: string[],
        public subtitle ?: string,
        public isbn13 ?: string

    ){}
}