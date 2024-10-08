import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/models/Book';

@Injectable({
  providedIn: 'root'
})
export class FavorisStorageService {

  jsonData : string | null = null;
  favoritesList : Book[]= []
  constructor(public http: HttpClient,
    private toastr: ToastrService) { }

  async saveBookToBookShelves(pBook:Book){
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
        this.toastr.success( pBook.title + 'a été ajouté à votre liste de favoris',`Succès`);
      }
      else{
        console.log('InfoWarning :', `Cet Livre ( ${pBook.title} ) existe déjà dans la liste de vos favoris.`)
        this.toastr.info(`Cet Livre ( ${pBook.title} ) existe déjà dans la liste de vos favoris.`,`Info`);
      }
    }
    else {
      // s'il n'y a pas de liste, on en crée une
      this.favoritesList = [pBook];
      localStorage.setItem("favoris", JSON.stringify(this.favoritesList));
    }
    
  } 

  async deleteBookFromBookShelves(pBook:Book):Promise<void>{
      this.jsonData = localStorage.getItem("favoris");

    if (this.jsonData != null) {
      this.favoritesList = JSON.parse(this.jsonData);

    // Recherche de l'index de l'objet dans la liste 
    let index = this.favoritesList.findIndex((book: Book) => book.key === pBook.key);

      if (index !== -1) {
        // Supprimer l'objet de la liste
        this.favoritesList.splice(index, 1); //(index = position de départ , 1 = a supprimé un élément)

        // Mise à jour de la liste dans localStorage
        localStorage.setItem("favoris", JSON.stringify(this.favoritesList));
        this.toastr.success( pBook.title + ' a été supprimé de votre liste de favoris ! ',`Succès`);
      }
    }
  }
}
