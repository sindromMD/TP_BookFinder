import { Book } from "./Book";

export class SubjectBook{

    constructor(
        public name ?: string,
        public workCount ?: string,
        public books: Book[] = [],
    ){}
}