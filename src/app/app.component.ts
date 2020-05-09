import { Component } from '@angular/core';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'skill-board';

  navOpened = true;

  constructor(private navService: NavigationService) {
    this.navService.isOpen$.subscribe((opened) => (this.navOpened = opened));
  }
}
