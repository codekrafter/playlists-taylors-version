import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedIn = false;
  constructor() {}

  ngOnInit(): void {
    const expiresAt = +sessionStorage.getItem('expires_at')!;
    if (expiresAt < Date.now()) sessionStorage.removeItem('access_token');
    
    this.loggedIn = !!sessionStorage.getItem('access_token');
  }
}
