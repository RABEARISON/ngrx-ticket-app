import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from "../../../interfaces/ticket.interface";
import {User} from "../../../interfaces/user.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {TicketUpdateRequested} from "../../store/ticket/ticket.action";

@Component({
  selector: 'app-ticket-ui',
  templateUrl: './ticket-ui.component.html',
  styleUrls: ['./ticket-ui.component.scss']
})
export class TicketUiComponent implements OnInit {

  @Input() ticket: Ticket = {} as Ticket;
  @Input() set users(value) {
    this._users = value;
    this.assigned = this._users.find(u => u.id === this.ticket.assigneeId);
  }
  assigned: User;
  _users: User[] = [];

  constructor(protected store: Store<AppState>) { }

  ngOnInit(): void {
  }

  updateAssignment(event): void {
    const assigned = event?.option?.value;
    const selected = event?.option?.selected;
    this.store.dispatch(TicketUpdateRequested({
      ticket: {
        ...this.ticket,
        assigneeId: selected ? assigned.id : null
      },
      key: 'update-assignment'
    }))
  }

}
