import {provideRouter, RouterConfig} from "@angular/router";
import {ClientComponent} from "./client/client.component";
import {ManagerComponent} from "./manager/manager.component";
import {PilotComponent} from "./pilot/pilot.component";
import {ManagerDetailComponent} from "./manager/manager-detail/manager-detail.component";
import {MarketComponent} from "./market/market.component";
import {LoginComponent} from "./login/login.component";
import {RaffleComponent} from "./raffle/raffle.component";

const routes: RouterConfig = [
  { path: 'manager', component: ManagerComponent },
  { path: 'manager/:id', component: ManagerDetailComponent },
  { path: 'pilot', component: PilotComponent },
  { path: 'market', component: MarketComponent },
  { path: 'login', component: LoginComponent },
  { path: 'raffle', component: RaffleComponent },
  { path: '**', component: ClientComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
