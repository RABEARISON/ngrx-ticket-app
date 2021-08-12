import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TicketUiComponent} from "./ticket-ui/ticket-ui.component";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {AvatarModule} from "ngx-avatar";
import { TicketUiLoaderComponent } from './ticket-ui-loader/ticket-ui-loader.component';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";



@NgModule({
  declarations: [TicketUiComponent, TicketUiLoaderComponent],
    exports: [
        TicketUiComponent,
        TicketUiLoaderComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule,
        MatIconModule,
        MatMenuModule,
        MatListModule,
        AvatarModule,
        NgxSkeletonLoaderModule
    ]
})
export class SharedModule { }
