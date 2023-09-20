import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { SubjectBook } from 'src/models/SubjectBook';
import { Book } from 'src/models/Book';
import { Author } from 'src/models/Author';

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
      // let publishDate = item.first_publish_year || '';

      // on cherche les détails du livre
      let book = await this.getBooksInfo(key);
      this.listBooksBySubject.books.push(book)
    });
    console.log(this.listBooksBySubject)
    return this.listBooksBySubject
  }

//méthode qui récupère certains détails du livre.
  async getBooksInfo(pKey:string):Promise<Book>{
    let result = await lastValueFrom(this.http.get<any>(`${baseURL}${pKey}.json`))
    // console.log(result);
    
    //Créer l'objet Book, avec les éléments recherchés, et vérifier qu'ils ne sont pas nuls.
    let moreInfo = await this.getMoreDetailsEdition(pKey);
    let authorInfo = await this.getAuthorInfo(result.authors[0].author.key)
    let newBook = new Book(
    result.key,
    result.title || '',
    result.covers && result.covers.length > 0 ? result.covers[0] : undefined,
    result.description?.value || 'Ce livre n\'a pas encore de description.',
    result.authors && result.authors.length > 0 && result.authors[0].author.key
      ? result.authors[0].author.key
      : undefined,
    authorInfo.name,
    result.subjects ? result.subjects.map((item:any) => item) : undefined,
    moreInfo.publishDate,
    moreInfo.nbPages,
    moreInfo.publishers,
    moreInfo.subtitle,
    moreInfo.isbn13
    );
    console.log(newBook);
   return newBook;
  }

// la méthode comporte des informations supplémentaires qui n'ont pas été trouvées dans les demandes précédentes
  async getMoreDetailsEdition(pkey:string):Promise<any>{
    let result = await lastValueFrom(this.http.get<any>(`${baseURL}${pkey}/editions.json`))
    console.log(result)
    let moreInfo = {

      publishDate: result.entries[0].publish_date || '',
      nbPages: result.entries[0].number_of_pages || '0',
      publishers: result.entries[0].publishers ? result.entries[0].publishers.map((item:any)=>item) : [],
      subtitle: result.entries[0].subtitle ? result.entries[0].subtitle : '',
      isbn13: result.entries[0].isbn_13 ? result.entries[0].isbn_13[0] : ''
    };
    return moreInfo;
  }
// renvoie des données sur un auteur
  async getAuthorInfo(pkey:string):Promise<any>{
    let result = await lastValueFrom(this.http.get<any>(`${baseURL}${pkey}.json`));
    console.log(result)
    let newAuthor = new Author(
      pkey,
      Array.isArray(result.name) && result.name.length > 0 ? result.name[0] : result.name,
      (result.bio && result.bio.value) ? result.bio.value : (result.bio ? result.bio : 'Cet auteur n\'a pas encore de biographie'),
      result.birth_date ? result.birth_date : undefined,
      result.photos && result.photos.length > 0 ? result.photos[0] : undefined,
    );
    return newAuthor;
  }
// qui renvoie la liste des œuvres et contributions de l'auteur à partir des paramètres
  async getAutorsWorks(pkey: string): Promise<SubjectBook> {
    let result= await lastValueFrom(this.http.get<any>(`${baseURL}${pkey}/works.json?limit=30`));
    console.log(result);
    this.listBooksBySubject = new SubjectBook();
      result.entries.forEach((item:any) => {
        let book = new Book(
          item.key,
          item.title,
          item.covers && item.covers.length > 0 ? item.covers[0] : '',
          item.description && item.description.value ? item.description.value : 'N/A',
          pkey,
          '',
          item.subjects ? item.subjects.map((subject: any) => subject) : [],
          );
          this.listBooksBySubject.books.push(book);
      });
      console.log(this.listBooksBySubject);
      return this.listBooksBySubject

  }

}
//https://openlibrary.org/works/OL45804W/editions.json
//https://openlibrary.org/authors/OL23919A.json
//https://openlibrary.org/authors/OL1394244A/works.json?limit=15





