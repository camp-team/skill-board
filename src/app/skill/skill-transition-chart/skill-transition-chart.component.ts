import { Component, OnInit } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { Observable } from 'rxjs';
import { Skill } from 'src/app/interfaces/skill';

@Component({
  selector: 'app-skill-transition-chart',
  templateUrl: './skill-transition-chart.component.html',
  styleUrls: ['./skill-transition-chart.component.scss'],
})
export class SkillTransitionChartComponent implements OnInit {
  transitionSkills$: Observable<Skill[]>;

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.transitionSkills$ = this.skillService.getTransitionSkills('java');
  }
}
