// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private titleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public title$ = this.titleSubject.asObservable();

    setTitle(title: string) {
        this.titleSubject.next(title);
    }
}
