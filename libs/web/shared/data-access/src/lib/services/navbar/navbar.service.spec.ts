import { TestBed } from '@angular/core/testing';
import { filter, take, toArray } from 'rxjs';

import { NavbarService } from './navbar.service';

describe.only('NavbarService', () => {
  let service: NavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return latest layer', (done) => {
    const title$ = service.latestProp$('title');

    service.registerNavbarLayer({ title: 'layer1' });
    service.registerNavbarLayer({ title: 'layer2' });

    title$.subscribe((prop) => {
      expect(prop?.value).toBe('layer2');
      done();
    });
  });

  it('should update the layer', (done) => {
    const title$ = service.latestProp$('title').pipe(
      filter((e) => e !== undefined),
      take(2),
      toArray(),
    );
    title$.subscribe((props) => {
      expect(props.map((e) => e?.value)).toEqual(['title1', 'title2']);
      done();
    });

    const layer = service.registerNavbarLayer({ title: 'title1' });
    layer.update({ title: 'title2' });
  });
});
