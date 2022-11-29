import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';

import { NavbarService } from '@forprosjekt/web/shared/data-access';
import { NavbarLayerInstance } from '@forprosjekt/web/shared/utils';

@Component({
  selector: 'forprosjekt-layout-navdrawer',
  templateUrl: './layout-navdrawer.component.html',
  styleUrls: ['./layout-navdrawer.component.scss'],
})
export class LayoutNavdrawerComponent implements OnInit {
  constructor(private bpo: BreakpointObserver, private navbar: NavbarService) {}

  closedLayer = this.navbar.registerNavbarLayer({
    button: 'menu',
    theme: {
      background: 'var(--primary)',
      color: 'var(--primary-contrast)',
    },
  });
  closedButtonSub = this.closedLayer.buttonClicked$.subscribe(() => {
    this.opened = true;
    this.attachOpenLayer();
  });

  openLayer?: NavbarLayerInstance;

  isMobile = false;
  opened = false;

  private attachOpenLayer(): void {
    this.openLayer = this.navbar.registerNavbarLayer({
      button: 'clear',
    });

    this.openLayer.buttonClicked$.subscribe(() => {
      this.openLayer?.release();
      this.opened = false;
    });
  }

  handleBackdropClick(): void {
    this.openLayer?.release();
    this.opened = false;
  }

  ngOnInit(): void {
    this.bpo
      .observe('(max-width: 800px)')
      .pipe(map((state) => state.breakpoints['(max-width: 800px)']))
      .subscribe((isMobile) => {
        this.isMobile = isMobile;
      });
  }
}
