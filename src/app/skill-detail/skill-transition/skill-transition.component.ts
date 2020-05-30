import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/interfaces/skill';

@Component({
  selector: 'app-skill-transition',
  templateUrl: './skill-transition.component.html',
  styleUrls: ['./skill-transition.component.scss'],
})
export class SkillTransitionComponent implements OnInit {
  @Input() skill: Skill;

  constructor() {}

  ngOnInit(): void {}
}
