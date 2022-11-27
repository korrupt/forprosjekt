import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebShellModule } from '@forprosjekt/web/shell/feature';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), WebShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
