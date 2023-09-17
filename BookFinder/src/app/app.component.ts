import { Component, OnInit } from '@angular/core';
import { OpenLibraryAPIService } from './services/open-library-api.service';
import { Subject } from 'src/models/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BookFinder';
  inputSearch: string = '';
  searchResult: Subject = new Subject;

  constructor(private openLibraryApiService : OpenLibraryAPIService){}

  async searchBySubject(): Promise<void> {

      this.searchResult = await this.openLibraryApiService.getBySubject(this.inputSearch);
      console.log(this.searchResult);//*
    }

   ngOnInit(): void {  
   }
}
