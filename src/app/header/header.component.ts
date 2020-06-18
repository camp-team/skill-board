import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { SkillService } from '../services/skill.service';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, startWith } from 'rxjs/operators';
import { Skill } from '../interfaces/skill';
// パターン2
// import { Page, Browser, launch, devices } from 'puppeteer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchControl = new FormControl('');
  autoComplateOptions = [];
  index = this.skillService.index.skills;

  // パターン1
  // puppeteer = require('puppeteer');

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navService: NavigationService,
    private skillService: SkillService
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

  puppeteerTest() {
    console.log('puppeteerTest');
  }

  // パターン1
  // async puppeteerTest() {
  //   const browser = await this.puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.goto('https://www.google.com');
  //   await page.screenshot({ path: 'screenshot.png' });
  //   await browser.close();
  // }

  // パターン2
  // async puppeteerTest() {
  //   const browser: Browser = await launch();
  //   const page: Page = await browser.newPage();
  //   await page.emulate(devices['iPhone X']);
  //   const url = 'https://google.com/';
  //   await page.goto(url, { waitUntil: 'networkidle0' });
  //   await page.screenshot({ path: 'home1.png' });
  //   const title = await page.title();
  //   console.log(title);
  //   await browser.close();
  // }
}
