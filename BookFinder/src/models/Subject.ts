import { Book } from "./Book";

export class Subject{

    constructor(
        public name ?: string,
        public workCount ?: string,
        public books: Book[] = [],
    ){}
}