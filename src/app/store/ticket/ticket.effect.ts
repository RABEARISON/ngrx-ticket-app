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
    switchMap(({ticket: {id, completed, assigneeId}, key}) => {
        let service = this.backendService.complete(id, completed);
        if (key === 'update-assignment') {
            service = this.backendService.assign(id, assigneeId);
        }
      return service.pipe(
        map(res => {
          return TicketActions.TicketUpdateSuccess( {ticket: res});
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
