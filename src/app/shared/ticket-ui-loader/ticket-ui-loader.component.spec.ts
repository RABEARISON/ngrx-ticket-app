import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketUiLoaderComponent } from './ticket-ui-loader.component';

describe('TicketUiLoaderComponent', () => {
  let component: TicketUiLoaderComponent;
  let fixture: ComponentFixture<TicketUiLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketUiLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketUiLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
