import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../interfaces/user.interface";
import {Ticket} from "../../../interfaces/ticket.interface";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  public readonly users$: Observable<User[]> = this.backendService.users();
  public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();
  constructor(private readonly backendService: BackendService) { }

  ngOnInit(): void {
  }

}
