import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./store/app.state";
import {version} from "../../package.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public version = version;
  public title;

  constructor(protected store: Store<AppState>) {
    this.title = 'app';
  }
}
