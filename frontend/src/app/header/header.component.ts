import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

logoUrl!: string;

ngOnInit(): void {
  
  this.logoUrl = 'https://static.vecteezy.com/system/resources/previews/007/410/276/original/furniture-logo-design-vector.jpg';

}

}
