import {provideRouter, RouterConfig} from "@angular/router";
import {FrontPageComponent} from "./frontpage/frontpage.component";
import {ManagerComponent} from "./manager/manager.component";
import {PilotComponent} from "./pilot/pilot.component";
import {ManagerDetailComponent} from "./manager/manager-detail/manager-detail.component";
import {MarketComponent} from "./market/market.component";
import {CallbackComponent} from "./callback/callback.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {ClientComponent} from "./client/client.component";
import {UpdatesComponent} from "./updates/updates.component";
import {OrderDetailComponent} from "./pilot/self-service/order-detail/order-detail.component";

const routes: RouterConfig = [
  { path: 'client', component: ClientComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'manager/:id', component: ManagerDetailComponent },
  { path: 'pilot', component: PilotComponent },
  { path: 'pilot/:id', component: OrderDetailComponent },
  { path: 'market', component: MarketComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'updates', component: UpdatesComponent },
  { path: '**', component: FrontPageComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
