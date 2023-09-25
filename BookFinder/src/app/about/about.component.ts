import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  linkOpenSource : string ='';

  getLinkOpenSource():void{
    this.linkOpenSource="https://openlibrary.org/developers/api";
  }
}
