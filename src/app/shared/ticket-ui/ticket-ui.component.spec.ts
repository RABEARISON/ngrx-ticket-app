import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketUiComponent } from './ticket-ui.component';

describe('TicketUiComponent', () => {
  let component: TicketUiComponent;
  let fixture: ComponentFixture<TicketUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
