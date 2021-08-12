import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {TicketLoadRequested, TicketRequestedSuccess} from "./store/ticket/ticket.action";

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let store: MockStore;
    let appState = {
        tickets: {
            loading: false,
            entities: {
                1: {
                    id: 1,
                    assigneeId: 111,
                    completed: false,
                    description: 'Test'
                }
            },
            ids: [1]
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                StoreModule.forRoot({})
            ],
            providers: [provideMockStore({})]
        });

        fixture = TestBed.createComponent(AppComponent);
        store = TestBed.inject(MockStore);
    });

    it('should create the app', () => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'app'`, () => {
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    });

    it('should render title in a h1 tag', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
    });
});
