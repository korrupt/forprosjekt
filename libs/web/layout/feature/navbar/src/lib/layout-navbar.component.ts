import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'forprosjekt-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.scss'],
})
export class LayoutNavbarComponent implements OnInit {
  icon?: string = 'home';

  ngOnInit(): void {
    setTimeout(() => {
      this.icon = 'clear';
    }, 500);
    setTimeout(() => {
      this.icon = undefined;
    }, 1000);
  }
}
