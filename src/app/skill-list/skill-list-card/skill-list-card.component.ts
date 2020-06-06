import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/interfaces/skill';

@Component({
  selector: 'app-skill-list-card',
  templateUrl: './skill-list-card.component.html',
  styleUrls: ['./skill-list-card.component.scss'],
})
export class SkillListCardComponent implements OnInit {
  @Input() skill: Skill;

  constructor() {}

  ngOnInit(): void {}
}
