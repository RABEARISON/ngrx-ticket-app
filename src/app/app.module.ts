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

@NgModule({
    declarations: [AppComponent, TicketsComponent, TicketDetailComponent],
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
        StoreModule.forRoot({}, {}),
        MatButtonModule,
    ],
    providers: [BackendService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
