import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/interfaces/skill';

@Component({
  selector: 'app-skill-detail-breakdown',
  templateUrl: './skill-detail-breakdown.component.html',
  styleUrls: ['./skill-detail-breakdown.component.scss'],
})
export class SkillDetailBreakdownComponent implements OnInit {
  @Input() skill: Skill;

  constructor() {}

  ngOnInit(): void {}
}
