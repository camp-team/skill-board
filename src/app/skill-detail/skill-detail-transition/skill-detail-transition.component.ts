import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/interfaces/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill-detail-transition',
  templateUrl: './skill-detail-transition.component.html',
  styleUrls: ['./skill-detail-transition.component.scss'],
})
export class SkillDetailTransitionComponent implements OnInit {
  @Input() skill: Skill;

  transitionSkills: Skill[] = [];

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    console.log('onInit');
    this.transitionSkills = this.skillService.getTransitionResult(
      this.skill.skillId
    );
    console.log(this.transitionSkills);
  }
}
