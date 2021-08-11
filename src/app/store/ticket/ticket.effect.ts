import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as TicketActions from './ticket.action';
import {of} from 'rxjs';
import { Store } from '@ngrx/store';
import {BackendService} from "../../services/backend.service";

@Injectable()
export class TicketsEffects {
  LoadTickets$ = createEffect( () => this.action$.pipe(
    ofType(TicketActions.TicketLoadRequested),
    switchMap(() => {
      return this.backendService.tickets().pipe(
        map((tickets) => {
          return TicketActions.TicketRequestedSuccess( {tickets});
        }),
        catchError((errorMessage) => {
          return of(TicketActions.TicketRequestedFailure({
            errorMessage
          }));
        })
      );
    })
  ));

  CreateTickets$ = createEffect( () => this.action$.pipe(
    ofType(TicketActions.TicketCreateRequested),
    switchMap(({description}) => {
      return this.backendService.newTicket({description}).pipe(
        map((ticket) => {
          return TicketActions.TicketCreateSuccess( {ticket});
        }),
        catchError((errorMessage) => {
          return of(TicketActions.TicketCreateFailure({
            errorMessage
          }));
        })
      );
    })
  ));

  UpdateTickets$ = createEffect( () => this.action$.pipe(
    ofType(TicketActions.TicketUpdateRequested),
    switchMap(({ticket}) => {
      return this.backendService.complete(ticket.id, ticket.completed).pipe(
        map(res => {
          return TicketActions.TicketUpdateSuccess( {ticket});
        }),
        catchError((errorMessage) => {
          return of(TicketActions.TicketUpdateFailure({
            errorMessage
          }));
        })
      );
    })
  ));

  constructor(
    private action$: Actions,
    private backendService: BackendService
  ) {}
}
