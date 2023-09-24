import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BookFinder';
  inputSearch: string = '';
  language = 'fr';

  constructor(
    private router: Router,
     public route: ActivatedRoute,
     public translator: TranslateService
     ){translator.setDefaultLang(this.language)}

  onKeyDownEvent(event: any) {
    this.router.navigate(['/books-by-subject', this.inputSearch], { relativeTo: this.route });
  }

  changeLanguage(): void {
    if(this.language === 'fr') {
      this.language = 'en';
    } else {
      this.language = 'fr';
    }
    this.translator.use(this.language);
  }

   ngOnInit(): void {  
   }
}
