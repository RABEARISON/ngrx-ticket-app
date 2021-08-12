import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketDetailComponent} from './ticket-detail.component';
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {StoreModule} from "@ngrx/store";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {TicketRequestedSuccess} from "../../store/ticket/ticket.action";
import {Ticket} from "../../../interfaces/ticket.interface";
import {User} from "../../../interfaces/user.interface";
import {UserRequestedSuccess} from "../../store/user/user.action";
import {AppResolver} from "../../app.resolver";

describe('TicketDetailComponent', () => {
  let component: TicketDetailComponent;
  let fixture: ComponentFixture<TicketDetailComponent>;
  let ticketId = 1;
  let store: MockStore;
  const initialState = { loading: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketDetailComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({})
      ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({id: ticketId})),
          }
        },
        provideMockStore({ initialState }),
          AppResolver
      ],
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Param id should equal to ${ticketId}`, () => {
    component.getParam$('id').subscribe(id => {
      expect(id).toEqual(ticketId, undefined);
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
