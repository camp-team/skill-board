import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/interfaces/skill';
import { SkillService } from 'src/app/services/skill.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss'],
})
export class SkillListComponent implements OnInit {
  constructor(private skillService: SkillService) {}

  ngOnInit(): void {}

  getSkills(): Observable<Skill[]> {
    return this.skillService.getSkills();
  }
}
