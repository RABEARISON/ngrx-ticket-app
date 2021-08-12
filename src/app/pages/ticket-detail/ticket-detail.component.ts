import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {combineLatest, Observable, Subject} from "rxjs";
import {map, take, takeUntil} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {selectUserLoading} from "../../store/user/user.selector";
import {selectTicket, selectTicketLoading} from "../../store/ticket/ticket.selector";
import {Ticket} from "../../../interfaces/ticket.interface";

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {

  public readonly activatedRoute$: Observable<ParamMap> = this.activatedRoute.paramMap;
  public loading$: Observable<boolean>;
  public ticket$: Observable<Ticket>;
  private _unsubscribeAll: Subject<any>;

  constructor(private activatedRoute: ActivatedRoute, protected store: Store<any>) {
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.getParam$('id')
        .pipe(take(1))
        .subscribe(id => {
          this.ticket$ = this.store.pipe(
              takeUntil(this._unsubscribeAll),
              select(selectTicket(id))
          );
        });
    this.loading$ = combineLatest([
      this.store.select(selectUserLoading),
      this.store.select(selectTicketLoading)
    ]).pipe(
        takeUntil(this._unsubscribeAll),
        map(([userLoading, ticketLoading]) => userLoading && ticketLoading)
    );
  }

  public getParam$(paramName: string): Observable<string|number> {
    return this.activatedRoute$.pipe(
        map((param: ParamMap) => param.get(paramName))
    );
  }

}
