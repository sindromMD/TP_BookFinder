import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OpenLibraryAPIService } from '../services/open-library-api.service';
import { SubjectBook } from 'src/models/SubjectBook';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  //  @Input() searchResult_bookList : any;

  subject : any ;
  searchResult: SubjectBook = new SubjectBook;

  constructor( public route: ActivatedRoute,
     private openLibraryApiService : OpenLibraryAPIService
     ){}

  // async ngOnInit():Promise<void> {
  //   this.subject = this.route.snapshot.paramMap.get("subject");
  //   console.log(this.subject)
  //   this.searchResult = await this.openLibraryApiService.getBySubject(this.searchResult_bookList);
  // }
  async ngOnInit(): Promise<void> {
    // on récupère la valeur du paramètre et on suit en plus cet élément
    this.route.params.subscribe(async (params: Params) => {
      this.subject = params['subject'];
      // console.log(this.subject);
      // On appelle le service pour mettre à jour les résultats en fonction du nouveau paramètre
      this.searchResult = await this.openLibraryApiService.getBySubject(this.subject);
    });
  }
}
