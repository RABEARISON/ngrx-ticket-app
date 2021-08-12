import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {combineLatest, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "./store/app.state";
import {filter, first, tap} from "rxjs/operators";
import {selectTicketLoaded} from "./store/ticket/ticket.selector";
import {TicketLoadRequested} from "./store/ticket/ticket.action";
import {selectUserLoaded} from "./store/user/user.selector";
import {UserLoadRequested} from "./store/user/user.action";

@Injectable()
export class AppResolver implements Resolve<boolean> {
    constructor(protected store: Store<AppState>) {}

    resolve(): boolean {
        combineLatest([
            this.store.select(selectUserLoaded),
            this.store.select(selectTicketLoaded),
        ]).pipe(
            tap(([userLoaded, ticketLoaded]) => {
                if (!ticketLoaded) {
                    this.store.dispatch(TicketLoadRequested());
                }
                if (!userLoaded) {
                    this.store.dispatch(UserLoadRequested());
                }
            }),
            filter(([userLoaded, ticketLoaded]) => userLoaded && ticketLoaded),
            first()
        ).subscribe()
        return true;
    }
}