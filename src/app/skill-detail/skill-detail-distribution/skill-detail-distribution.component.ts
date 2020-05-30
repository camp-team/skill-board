import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/interfaces/skill';

@Component({
  selector: 'app-skill-detail-distribution',
  templateUrl: './skill-detail-distribution.component.html',
  styleUrls: ['./skill-detail-distribution.component.scss'],
})
export class SkillDetailDistributionComponent implements OnInit {
  @Input() skill: Skill;

  constructor() {}

  ngOnInit(): void {}
}
