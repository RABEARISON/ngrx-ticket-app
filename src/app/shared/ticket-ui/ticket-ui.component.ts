import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from "../../../interfaces/ticket.interface";
import {User} from "../../../interfaces/user.interface";

@Component({
  selector: 'app-ticket-ui',
  templateUrl: './ticket-ui.component.html',
  styleUrls: ['./ticket-ui.component.scss']
})
export class TicketUiComponent implements OnInit {

  @Input() ticket: Ticket;
  @Input() users: User[];

  constructor() { }

  ngOnInit(): void {
  }

}
