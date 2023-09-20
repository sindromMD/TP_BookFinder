import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OpenLibraryAPIService } from '../services/open-library-api.service';
import { Book } from 'src/models/Book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

    workKey : string = '' ;
    searchResult : Book = new Book('')

    constructor(
      public route : ActivatedRoute,
      private openLibraryApiService : OpenLibraryAPIService
    ){}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params: Params) => {
      this.workKey = params['keyWork'];
      console.log(this.workKey);
      // On appelle le service pour mettre à jour les résultats en fonction du nouveau paramètre
      this.searchResult = await this.openLibraryApiService.getBooksInfo(this.workKey);
    });
  }
}
