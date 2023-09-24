import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavorisStorageService } from '../services/favoris-storage.service';
import { Book } from 'src/models/Book';

@Component({
  selector: 'app-favorite-books',
  templateUrl: './favorite-books.component.html',
  styleUrls: ['./favorite-books.component.css']
})
export class FavoriteBooksComponent implements OnInit {

  jsonData : string | null = null;
  favoritesList : Book[]= [];
  counter ?: number;

  constructor(
    public route : ActivatedRoute,
    private favorisStorageService: FavorisStorageService
  ){}

  async ngOnInit():Promise<void> {
    this.jsonData = localStorage.getItem("favoris");
    if(this.jsonData !=null){
      this.favoritesList = JSON.parse(this.jsonData);
      this.counter = this.favoritesList.length;
    }
  }
  async deletefromFavoris(book:Book):Promise<void>{
    this.favorisStorageService.deleteBookFromBookShelves(book);
    this.ngOnInit();
  }
}
