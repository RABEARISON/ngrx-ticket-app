import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketsComponent} from './tickets.component';
import {BackendService} from "../../services/backend.service";
import {StoreModule} from "@ngrx/store";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {DragDropModule} from "@angular/cdk/drag-drop";

describe('TicketsComponent', () => {
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsComponent ],
      providers:[BackendService, provideMockStore({})],
      imports: [StoreModule.forRoot({}), MatDialogModule, DragDropModule],
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
