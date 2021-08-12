import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAddComponent } from './ticket-add.component';
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('TicketAddComponent', () => {
  let component: TicketAddComponent;
  let fixture: ComponentFixture<TicketAddComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAddComponent ],
      providers: [provideMockStore({}), {
        provide: MatDialogRef,
        useValue: {}
      }],
      imports: [MatDialogModule]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
