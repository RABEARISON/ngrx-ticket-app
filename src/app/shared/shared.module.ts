import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketUiComponent} from "./ticket-ui/ticket-ui.component";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [TicketUiComponent],
  exports: [
    TicketUiComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule
    ]
})
export class SharedModule { }
