import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

imageUrl!: 'assets/header-photo.webp';

ngOnInit(): void {
  
  this.imageUrl = 'assets/header-photo.webp';

}

}
