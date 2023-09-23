import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BookFinder';
  inputSearch: string = '';

  constructor(private router: Router, public route: ActivatedRoute){}

  onKeyDownEvent(event: any) {
    this.router.navigate(['/books-by-subject', this.inputSearch], { relativeTo: this.route });
  }
   ngOnInit(): void {  
   }
}
