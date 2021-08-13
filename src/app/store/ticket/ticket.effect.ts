import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import * as TicketActions from './ticket.action';
import {of} from 'rxjs';
import { Store } from '@ngrx/store';
import {BackendService} from "../../services/backend.service";
import {AppState} from "../app.state";

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
    tap(({ticket, key}) => {
        let service;

        switch (key) {
            case 'update-completed':
                service = this.backendService.complete(ticket.id, ticket.completed);
                break;
            case 'update-assignment':
            default:
                service = this.backendService.assign(ticket.id, ticket.assigneeId);
                break;
        }

        this.store.dispatch(TicketActions.TicketUpdateSuccess( {ticket}));

        return service.pipe(
            catchError((errorMessage) => {
                this.store.dispatch(TicketActions.TicketUpdateRollback());
                return of(TicketActions.TicketUpdateFailure({
                    errorMessage
                }));
            })
        );
    })
  ), {dispatch: false});


  constructor(
    private action$: Actions,
    private backendService: BackendService,
    protected store: Store<AppState>
  ) {}
}
