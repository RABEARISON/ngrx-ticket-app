import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, Subject} from "rxjs";
import {User} from "../../../interfaces/user.interface";
import {Ticket} from "../../../interfaces/ticket.interface";
import {select, Store} from "@ngrx/store";
import {selectAllUser, selectUserLoading} from "../../store/user/user.selector";
import {selectCompletedTickets, selectTicketLoading, selectTodoTickets} from "../../store/ticket/ticket.selector";
import {debounceTime, distinctUntilChanged, map, takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {TicketAddComponent} from "./ticket-add/ticket-add.component";
import {TicketUpdateRequested} from "../../store/ticket/ticket.action";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  public users$: Observable<User[]>;
  public loading$: Observable<boolean>;
  public search$: Observable<string>;

  public search: string;
  public keyup = new Subject();
  public tickets: Ticket[] = [];
  private _tickets: Ticket[] = [];

  public completedTickets: Ticket[] = [];
  private _completedTickets: Ticket[] = [];

  public assignedFilter = null;
  private _unsubscribeAll: Subject<any>;

  constructor(protected store: Store<any>, private dialog: MatDialog) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {

    this.search$ = this.keyup.pipe(
        takeUntil(this._unsubscribeAll),
        map((searchValue: string) => searchValue),
        debounceTime(250),
        distinctUntilChanged()
    );

    this.search$.pipe(
        takeUntil(this._unsubscribeAll)
    ).subscribe(value => {
        this.filterChanged({value: this.assignedFilter});
    })

    this.store.pipe(
        takeUntil(this._unsubscribeAll),
        select(selectTodoTickets)
    ).subscribe(tickets => {
      this.tickets = tickets;
      // clone original tickets to do filter
      this._tickets = [...tickets];
    });

    this.users$ = this.store.pipe(
        takeUntil(this._unsubscribeAll),
        select(selectAllUser)
    );

    this.store.pipe(
        takeUntil(this._unsubscribeAll),
        select(selectCompletedTickets)
    ).subscribe(tickets => {
      this.completedTickets = tickets;
      // clone original tickets to do filter
      this._completedTickets = [...tickets];
    });

    this.loading$ = combineLatest([
      this.store.select(selectUserLoading),
      this.store.select(selectTicketLoading)
    ]).pipe(
        takeUntil(this._unsubscribeAll),
        map(([userLoading, ticketLoading]) => userLoading || ticketLoading)
    )
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  openModalAddTicket() {
    this.dialog.open(TicketAddComponent, {
      minWidth: '450px'
    } );
  }

  drop(event, {completed}): void {
    const ticket = event?.item?.data;
      this.store.dispatch(TicketUpdateRequested({
        ticket: {
          ...ticket,
          completed
        },
        key: 'update-completed'
      }))
  }

  filterRows({value, rows, filterOn}): any[] {
    const key = value?.toLowerCase();
    return rows.filter(ticket => {
      const text = ticket[filterOn]?.toLowerCase();
      return (value && filterOn) ? text.indexOf(key) > -1 : true;
    });
  }

  filterChanged(event): void {
      this.assignedFilter = event?.value;
      this.tickets = this.filterAssignment(this._tickets);
      this.tickets = this.filterRows({
        value: this.search,
        rows: this.tickets,
        filterOn: 'description'
      });

      this.completedTickets = this.filterAssignment(this._completedTickets);
      this.completedTickets = this.filterRows({
        value: this.search,
        rows: this.completedTickets,
        filterOn: 'description'
      });
  }

  filterAssignment(rows: Ticket[]): Ticket[] {
    return rows.filter(ticket => {
      return !this.assignedFilter ||
          (this.assignedFilter === 'assigned' && ticket.assigneeId !== null) ||
          (this.assignedFilter === 'unassigned' && ticket.assigneeId === null);

    });
  }

}
