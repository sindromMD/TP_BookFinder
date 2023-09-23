import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OpenLibraryAPIService } from '../services/open-library-api.service';
import { Author } from 'src/models/Author';
import { SubjectBook } from 'src/models/SubjectBook';


@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit{

  authorKey ?: string;
  searchResult : Author = new Author();
  searchResultBooks : SubjectBook = new SubjectBook();
  
  constructor(
    public route : ActivatedRoute,
    private openLibraryApiService : OpenLibraryAPIService
    ){}

    async ngOnInit(): Promise<void> {
      this.route.params.subscribe(async (params: Params) => {
        this.authorKey = params['keyAuthor'];
        console.log(this.authorKey);
        if (this.authorKey) {
          this.searchResult = await this.openLibraryApiService.getAuthorInfo(this.authorKey);
          this.searchResultBooks = await this.openLibraryApiService.getAutorsWorks(this.authorKey);
        }
      });
    }
}
