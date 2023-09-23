import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from 'src/models/Book';

@Injectable({
  providedIn: 'root'
})
export class FavorisStorageService {

  jsonData : string | null = null;
  favoritesList : Book[]= []
  constructor(public http: HttpClient) { }

  async saveBookToBookShelves(pBook:any){
    this.jsonData = localStorage.getItem("favoris");
    if(this.jsonData !=null){
      this.favoritesList = JSON.parse(this.jsonData);

        // On vérifie s'il existe déjà un livre similaire dans la liste
      let isDuplicate = this.favoritesList.some((book: any) => {
        return (
          book.key === pBook.key //on comparait les clés
        );
      });

      // si le livre n'a pas été trouvé, ajouter à la liste
      if(!isDuplicate) {
        this.favoritesList.push(pBook);
        localStorage.setItem("favoris", JSON.stringify(this.favoritesList));
      }
      else{
        console.log('InfoWarning :', `Cet Livre ( ${pBook.title} ) existe déjà dans la liste de vos favoris.`)
      }
    }
    else {
      // s'il n'y a pas de liste, on en crée une
      this.favoritesList = [pBook];
      localStorage.setItem("favoris", JSON.stringify(this.favoritesList));
    }
    
  } 
}
