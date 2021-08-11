import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Ticket } from '../interfaces/ticket.interface';
import { User } from '../interfaces/user.interface';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

function randomDelay() {
    return Math.random() * 4000;
}

@Injectable()
export class BackendService {
    public storedTickets: Ticket[] = [
        {
            id: 0,
            completed: false,
            assigneeId: 111,
            description: 'Install a monitor arm'
        },
        {
            id: 1,
            completed: false,
            assigneeId: 111,
            description: 'Move the desk to the new location'
        }
    ];

    public storedUsers: User[] = [{ id: 111, name: 'Victor' }];

    private lastId: number = 1;

    private findUserById = id => this.storedUsers.find((user: User) => user.id === +id);
    private findTicketById = id => this.storedTickets.find((ticket: Ticket) => ticket.id === +id);

    public tickets(): Observable<Ticket[]> {
        return of(this.storedTickets).pipe(delay(randomDelay()));
    }

    public ticket(id: number): Observable<Ticket> {
        return of(this.findTicketById(id)).pipe(delay(randomDelay()));
    }

    public users(): Observable<User[]> {
        return of(this.storedUsers).pipe(delay(randomDelay()));
    }

    public user(id: number): Observable<User> {
        return of(this.findUserById(id)).pipe(delay(randomDelay()));
    }

    public newTicket(payload: { description: string }): Observable<Ticket> {
        const newTicket: Ticket = {
            id: ++this.lastId,
            completed: false,
            assigneeId: null,
            description: payload.description
        };

        return of(newTicket).pipe(
            delay(randomDelay()),
            tap((ticket: Ticket) => this.storedTickets.push(ticket))
        );
    }

    public assign(ticketId: number, userId: number): Observable<Ticket> {
        const user = this.findUserById(+userId);
        const foundTicket = this.findTicketById(+ticketId);

        if (foundTicket && user) {
            return of(foundTicket).pipe(
                delay(randomDelay()),
                tap((ticket: Ticket) => {
                    ticket.assigneeId = +userId;
                })
            );
        }

        return throwError(new Error('ticket or user not found'));
    }

    public complete(ticketId: number, completed: boolean): Observable<Ticket> {
        const foundTicket = this.findTicketById(+ticketId);

        if (foundTicket) {
            return of(foundTicket).pipe(
                delay(randomDelay()),
                tap((ticket: Ticket) => {
                    ticket.completed = true;
                })
            );
        }

        return throwError(new Error('ticket not found'));
    }
}
