import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {TicketCreateRequested} from "../../../store/ticket/ticket.action";
import {MatDialogRef} from "@angular/material/dialog";
import {selectTicketLoading} from "../../../store/ticket/ticket.selector";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.scss']
})
export class TicketAddComponent implements OnInit, OnDestroy {

  public ticketForm: FormGroup;
  public submitting = false;

  private _unsubscribeAll: Subject<any>;

  constructor(protected store: Store<any>, private dialogRef: MatDialogRef<any>) {
    this.ticketForm = new FormGroup({
      description: new FormControl('', Validators.required)
    });
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.store.pipe(
        takeUntil(this._unsubscribeAll),
        select(selectTicketLoading)
    ).subscribe(loading => {
       if (!loading && this.submitting) {
         this.dialogRef.close();
       }
    })
  }


  submit(): void {
    this.submitting = true;
    const description = this.ticketForm.value.description;
    this.store.dispatch(TicketCreateRequested({
      description
    }));
  }

}
