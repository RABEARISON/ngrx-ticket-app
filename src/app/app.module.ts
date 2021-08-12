import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BackendService } from './services/backend.service';
import {AppRoutingModule} from './app-routing.module';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import {SharedModule} from "./shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {MatButtonModule} from "@angular/material/button";
import {TicketStore} from "./store/ticket/ticket.store";
import {UserStore} from "./store/user/user.store";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AppResolver} from "./app.resolver";
import { TicketAddComponent } from './pages/tickets/ticket-add/ticket-add.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {MatBadgeModule} from "@angular/material/badge";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
    declarations: [AppComponent, TicketsComponent, TicketDetailComponent, TicketAddComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        BrowserAnimationsModule,
        TicketStore,
        UserStore,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),

        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: true // for development
        }),
        MatButtonModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDividerModule,
        FormsModule,
        MatIconModule,
        MatToolbarModule,
        NgxSkeletonLoaderModule,
        MatBadgeModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        DragDropModule,
    ],
    providers: [BackendService, AppResolver],
    bootstrap: [AppComponent],
})
export class AppModule {

}
