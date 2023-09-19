import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailsComponent,
    AuthorDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot([
      {path: "", redirectTo : "/home", pathMatch:"full"},
      {path: "books-by-subject/:subject", component : BooksListComponent},
      {path: "books-by-subject", component : BooksListComponent},
      {path: "book-details/:key", component : BookDetailsComponent}

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
