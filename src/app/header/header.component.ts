import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  form = this.fb.group({
    searchInput: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private navService: NavigationService,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {}

  submit() {
    console.log(this.form.value);
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
}
