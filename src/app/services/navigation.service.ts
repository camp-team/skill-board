import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}

  isOpenSource = new ReplaySubject<boolean>(1);
  isOpen$: Observable<boolean> = this.isOpenSource.asObservable();
  isOpened = true;

  toggle() {
    this.isOpened = !this.isOpened;
    this.isOpenSource.next(this.isOpened);
  }
}
