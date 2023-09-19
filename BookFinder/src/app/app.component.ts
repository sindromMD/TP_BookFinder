import { Component, OnInit } from '@angular/core';
// import { OpenLibraryAPIService } from './services/open-library-api.service';
// import { SubjectBook } from 'src/models/SubjectBook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BookFinder';
  inputSearch: string = '';
  // searchResult: SubjectBook = new SubjectBook;

  //ajouter des services au constructeur de classes
  // constructor(private openLibraryApiService : OpenLibraryAPIService){}

  // metoda trigger pentru lansarea cautarii dupa subiect
  // async searchBySubject(): Promise<void> {

  //     this.searchResult = await this.openLibraryApiService.getBySubject(this.inputSearch);
  //     console.log(this.searchResult);//*
  //   }

   ngOnInit(): void {  
   }
}
