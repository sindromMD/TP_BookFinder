import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { SubjectBook } from 'src/models/SubjectBook';
import { Book } from 'src/models/Book';

const baseURL = `https://openlibrary.org`

@Injectable({
  providedIn: 'root'
})
export class OpenLibraryAPIService {

  listBooksBySubject: SubjectBook = new SubjectBook();

  constructor( public http: HttpClient  ) { }
  
// méthode qui forme une liste de livres en fonction du sujet recherché
  async getBySubject(pSubject:string):Promise<any>{
    let result = await lastValueFrom(this.http.get<any>(`${baseURL}/search.json?q=subject%3A${pSubject}&mode=everything&sort=rating&language=fre`))
    console.log(result);
    this.listBooksBySubject = new SubjectBook();
    this.listBooksBySubject.name = pSubject;
    this.listBooksBySubject.workCount = result.numFound; // nombre d'œuvres

    //récupérer la liste des œuvres (la liste ne contient que des clés)
    let listBooks = result.docs;

    //on parcourt chaque œuvre
    listBooks.forEach(async(item:any) => {

      //on récupère certaines propriétés qui sont absentes des détails du livre
      let key = item.key;
      let authorName = item.author_name; 
      let publishDate = item.first_publish_year || '';

      // on cherche les détails du livre
      this.getBooksInfo(key,publishDate, authorName);
      
    });
    console.log(this.listBooksBySubject)
    return this.listBooksBySubject
  }

//méthode qui récupère certains détails du livre.
  async getBooksInfo(pKey:string, pYear:string, pAuthorName:any):Promise<void>{
    let result = await lastValueFrom(this.http.get<any>(`${baseURL}${pKey}.json`))
    // console.log(result);
    
    //Créer l'objet Book, avec les éléments recherchés, et vérifier qu'ils ne sont pas nuls.
    let newBook = new Book(
      result.key || '',
      result.title || '',
      result.covers && result.covers.length > 0 ? result.covers[0] : '',
      result.description && result.description.value ? result.description.value : '',
      result.authors && result.authors.length > 0 && result.authors[0].author.key ? result.authors[0].author.key : '',
      pAuthorName  && pAuthorName.length >0 ? pAuthorName[0]: '',
      // ajouter seulement 10 étiquettes à la liste
      result.subjects ? result.subjects.slice(0, 10) : [],
      pYear || ''
    );
    this.listBooksBySubject.books.push(newBook)
  }
}



