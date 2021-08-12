import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {User} from "../../../interfaces/user.interface";
import {Ticket} from "../../../interfaces/ticket.interface";
import {select, Store} from "@ngrx/store";
import {selectAllUser, selectUserLoading} from "../../store/user/user.selector";
import {selectCompletedTickets, selectTicketLoading, selectTodoTickets} from "../../store/ticket/ticket.selector";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {TicketAddComponent} from "./ticket-add/ticket-add.component";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  // public readonly users$: Observable<User[]> = this.backendService.users();
  // public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();
  public users$: Observable<User[]>;
  public todoTickets$: Observable<Ticket[]>;
  public completedTickets$: Observable<Ticket[]>;
  public loading$: Observable<boolean>;
  public search: string;

  constructor(protected store: Store<any>, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.users$ = this.store.pipe(
        select(selectAllUser)
    );
    this.todoTickets$ = this.store.pipe(select(selectTodoTickets));
    this.completedTickets$ = this.store.pipe(select(selectCompletedTickets));

    this.loading$ = combineLatest([
      this.store.select(selectUserLoading),
      this.store.select(selectTicketLoading)
    ]).pipe(
        map(([userLoading, ticketLoading]) => userLoading || ticketLoading)
    )

    // setInterval(() => {
    //   this.store.dispatch(TicketCreateRequested({description: 'Test test'}))
    // }, 5000)
  }

  openModalAddTicket() {
    this.dialog.open(TicketAddComponent, {
      minWidth: '450px'
    } );
  }

}
