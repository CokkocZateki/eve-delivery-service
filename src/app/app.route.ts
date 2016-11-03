import {provideRouter, RouterConfig} from "@angular/router";
import {FrontPageComponent} from "./frontpage/frontpage.component";
import {ManagerComponent} from "./manager/manager.component";
import {PilotComponent} from "./pilot/pilot.component";
import {ManagerDetailComponent} from "./manager/manager-detail/manager-detail.component";
import {MarketComponent} from "./market/market.component";
import {CallbackComponent} from "./callback/callback.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";

const routes: RouterConfig = [
  { path: 'manager', component: ManagerComponent },
  { path: 'manager/:id', component: ManagerDetailComponent },
  { path: 'pilot', component: PilotComponent },
  { path: 'market', component: MarketComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: FrontPageComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
