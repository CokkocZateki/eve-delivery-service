import { provideRouter, RouterConfig } from '@angular/router';
import {ClientComponent} from "./client/client.component";
import {ManagerComponent} from "./manager/manager.component";

const routes: RouterConfig = [
  { path: 'manager', component: ManagerComponent },
  { path: '**', component: ClientComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
