import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {

  public readonly activatedRoute$: Observable<ParamMap> = this.activatedRoute.paramMap;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public getParam$(paramName: string): Observable<string|number> {
    return this.activatedRoute$.pipe(
        map((param: ParamMap) => param.get(paramName))
    );
  }

}
