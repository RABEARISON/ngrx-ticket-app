import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketUiComponent} from './ticket-ui.component';
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {TicketRequestedSuccess} from "../../store/ticket/ticket.action";
import {UserRequestedSuccess} from "../../store/user/user.action";
import {Ticket} from "../../../interfaces/ticket.interface";
import {User} from "../../../interfaces/user.interface";

describe('TicketUiComponent', () => {
  let component: TicketUiComponent;
  let fixture: ComponentFixture<TicketUiComponent>;
  let store: MockStore;
  const initialState = { loading: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketUiComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({})
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketUiComponent);
    component = fixture.componentInstance;
    // mock @Input() ticket
    component.ticket = {
      id: 1,
      description: 'Test',
      completed: false,
      assigneeId: 111
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
