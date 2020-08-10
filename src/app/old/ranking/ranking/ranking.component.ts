import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from 'src/app/interfaces/skill';
import { SkillService } from 'src/app/services/skill.service';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  skills$: Observable<Skill[]> = this.skillService.getSkills();

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {}
}
