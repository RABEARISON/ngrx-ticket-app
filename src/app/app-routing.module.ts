import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TicketsComponent} from "./pages/tickets/tickets.component";
import {TicketDetailComponent} from "./pages/ticket-detail/ticket-detail.component";

const routes: Routes = [
  {
    path: '',
    component: TicketsComponent
  },
  {
    path: ':id',
    component: TicketDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
