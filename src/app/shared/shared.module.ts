import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketUiComponent} from "./ticket-ui/ticket-ui.component";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [TicketUiComponent],
  exports: [
    TicketUiComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule
    ]
})
export class SharedModule { }
