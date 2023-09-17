import { Book } from "./Book";

export class Subject{

    constructor(
        public key : string,
        public name : string,
        public workCount : number,
        public book: Book[] = [],
    ){}
}