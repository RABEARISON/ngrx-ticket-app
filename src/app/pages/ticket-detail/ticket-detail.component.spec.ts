import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketDetailComponent} from './ticket-detail.component';
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";

describe('TicketDetailComponent', () => {
  let component: TicketDetailComponent;
  let fixture: ComponentFixture<TicketDetailComponent>;
  let ticketId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketDetailComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({id: ticketId})),
          }
        }
      ]
    })
    .compileComponents();
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
