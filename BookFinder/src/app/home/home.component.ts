import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  inputSearch: string = '';
  constructor(public route: ActivatedRoute, public router : Router){}

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.router.navigate(['/books-by-subject', this.inputSearch]);
    }
  }
}
