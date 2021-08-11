import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as UserActions from './user.action';
import {of} from 'rxjs';
import {BackendService} from "../../services/backend.service";

@Injectable()
export class UsersEffects {
  LoadUsers$ = createEffect( () => this.action$.pipe(
    ofType(UserActions.UserLoadRequested),
    switchMap(() => {
      return this.backendService.users().pipe(
        map((users) => {
          return UserActions.UserRequestedSuccess( {users});
        }),
        catchError((errorMessage) => {
          return of(UserActions.UserRequestedFailure({
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
