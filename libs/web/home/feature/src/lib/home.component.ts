import { Component, OnDestroy } from '@angular/core';
import { NavbarService } from '@forprosjekt/web/shared/data-access';

@Component({
  selector: 'forprosjekt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  constructor(private navbar: NavbarService) {}

  private layer = this.navbar.registerNavbarLayer({
    title: 'Home',
  });

  ngOnDestroy(): void {
    this.layer.release();
  }
}
