import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoriteBooksComponent } from './favorite-books/favorite-books.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailsComponent,
    AuthorDetailsComponent,
    HomeComponent,
    FavoriteBooksComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      {path: "", redirectTo : "/home", pathMatch:"full"},
      {path: "home", component: HomeComponent},
      {path: "favorite-books", component : FavoriteBooksComponent},
      {path: "about", component : AboutComponent},
      {path: "books-by-subject/:subject", component : BooksListComponent},
      {path: "book-details/:keyWork", component : BookDetailsComponent},
      {path: "author-details/:keyAuthor", component : AuthorDetailsComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
