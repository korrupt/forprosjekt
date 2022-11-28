import { Component } from '@angular/core';
import { NavbarService } from '@forprosjekt/web/shared/data-access';
import { map } from 'rxjs';

@Component({
  selector: 'forprosjekt-layout-shell',
  templateUrl: './layout-shell.component.html',
  styleUrls: ['./layout-shell.component.scss'],
})
export class LayoutShellComponent {
  constructor(private navbar: NavbarService) {
    this.paddingTop$.subscribe((s) => console.log(s));
  }

  paddingTop$ = this.navbar
    .latestProp$('theme')
    .pipe(map((layer) => (layer ? (layer.value?.background === 'transparent' ? 0 : 56) : 0)));

  private layer = this.navbar.registerNavbarLayer({
    title: 'Home',
    button: 'menu',
    theme: {
      color: '#000',
      background: '#FFF',
    },
  });
}
