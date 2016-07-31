import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import {HTTP_PROVIDERS} from "@angular/http";
import {appRouterProviders} from "./app/app.route";

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [HTTP_PROVIDERS, appRouterProviders])
  .catch(err => console.error(err));
