import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./store/app.state";
import {TicketLoadRequested} from "./store/ticket/ticket.action";
import {UserLoadRequested} from "./store/user/user.action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title;

  constructor(protected store: Store<AppState>) {
    this.title = 'app';
  }
}
