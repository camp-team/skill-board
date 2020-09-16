import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/interfaces/skill';
import { SkillService } from 'src/app/services/skill.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skill-detail-transition',
  templateUrl: './skill-detail-transition.component.html',
  styleUrls: ['./skill-detail-transition.component.scss'],
})
export class SkillDetailTransitionComponent implements OnInit {
  @Input() skill: Skill;

  transitionSkills: Observable<Skill[]>;

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.transitionSkills = this.skillService.getSkillHistories(
      this.skill.skillId
    );
  }
}
