import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/interfaces/skill';

@Component({
  selector: 'app-skill-detail-transition',
  templateUrl: './skill-detail-transition.component.html',
  styleUrls: ['./skill-detail-transition.component.scss'],
})
export class SkillDetailTransitionComponent implements OnInit {
  @Input() skill: Skill;

  constructor() {}

  ngOnInit(): void {}
}
