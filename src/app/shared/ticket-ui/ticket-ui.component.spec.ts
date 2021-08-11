import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketUiComponent } from './ticket-ui.component';
import {RouterModule} from "@angular/router";
import {TicketDetailComponent} from "../../pages/ticket-detail/ticket-detail.component";
import {RouterTestingModule} from "@angular/router/testing";

describe('TicketUiComponent', () => {
  let component: TicketUiComponent;
  let fixture: ComponentFixture<TicketUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketUiComponent ],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
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
