import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { SkillService } from '../services/skill.service';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, startWith, tap } from 'rxjs/operators';
import { Skill } from '../interfaces/skill';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchControl = new FormControl('');
  autoComplateOptions = [];
  index = this.skillService.index.skills;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navService: NavigationService,
    private skillService: SkillService,
    private fns: AngularFireFunctions
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(500))
      .subscribe((key) => {
        this.index.search<Skill[]>(key).then((result) => {
          this.autoComplateOptions = result.hits;
        });
      });
  }

  setSearchQuery(value: string) {
    this.searchControl.setValue(value, {
      emitEvent: false,
    });
  }

  routeSearch(searchQuery: string) {
    this.router.navigate(['/skill'], {
      queryParams: {
        searchQuery: searchQuery || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  login() {
    console.log('login');
  }

  navToggle() {
    this.navService.toggle();
  }

  uploadSampleData() {
    this.skillService.uploadSampleData();
  }

  executePuppeteerFunction() {
    const callable = this.fns.httpsCallable('puppeteerExcute');
    const data$: Observable<any> = callable({});
    data$.pipe(tap((r) => console.log(r))).subscribe();
  }
}
