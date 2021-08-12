import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {combineLatest, Observable} from "rxjs";
import {map, take} from "rxjs/operators";
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

  constructor(private activatedRoute: ActivatedRoute, protected store: Store<any>) { }

  ngOnInit(): void {
    this.getParam$('id')
        .pipe(take(1))
        .subscribe(id => {
          this.ticket$ = this.store.pipe(
              select(selectTicket(id))
          );
        });
    this.loading$ = combineLatest([
      this.store.select(selectUserLoading),
      this.store.select(selectTicketLoading)
    ]).pipe(
        map(([userLoading, ticketLoading]) => userLoading && ticketLoading)
    );
  }

  public getParam$(paramName: string): Observable<string|number> {
    return this.activatedRoute$.pipe(
        map((param: ParamMap) => param.get(paramName))
    );
  }

}
