import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import * as fromTicket from './ticket.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TicketsEffects} from './ticket.effect';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    MatDialogModule,
    StoreModule.forFeature('ticket', fromTicket.reducer),
    EffectsModule.forFeature([TicketsEffects])
  ]
})
export class TicketStore { }
