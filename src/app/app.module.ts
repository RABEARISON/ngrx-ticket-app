import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BackendService } from './services/backend.service';
import {AppRoutingModule} from './app-routing.module';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import {SharedModule} from "./shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent, TicketsComponent, TicketDetailComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        BrowserAnimationsModule
    ],
    providers: [BackendService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
