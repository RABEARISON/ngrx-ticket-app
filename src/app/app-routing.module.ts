import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TicketsComponent} from "./pages/tickets/tickets.component";
import {TicketDetailComponent} from "./pages/ticket-detail/ticket-detail.component";
import {AppResolver} from "./app.resolver";

const routes: Routes = [
  {
    path: '',
    component: TicketsComponent,
    resolve: {
      ticketResolver: AppResolver
    }
  },
  {
    path: ':id',
    component: TicketDetailComponent,
    resolve: {
      tickedDetailResolver: AppResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
