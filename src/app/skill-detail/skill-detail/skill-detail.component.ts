import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SkillService } from 'src/app/services/skill.service';
import { Skill } from 'src/app/interfaces/skill';

interface Tab {
  name: string;
  caption: string;
  icon: string;
}

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss'],
})
export class SkillDetailComponent implements OnInit {
  skillId: string;
  skill$: Observable<Skill>;
  tabs: Tab[] = [
    {
      name: 'transition',
      caption: '推移',
      icon: 'show_chart',
    },
    {
      name: 'breakdown',
      caption: '内訳',
      icon: 'pie_chart',
    },
    {
      name: 'distribution',
      caption: '分布',
      icon: 'bar_chart',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    this.skillId = this.route.snapshot.paramMap.get('id');
    this.skill$ = this.skillService.getResult(this.skillId).pipe(take(1));
  }

  getActiveTab(): string {
    if (this.route.snapshot.queryParamMap.has('tab')) {
      return this.route.snapshot.queryParamMap.get('tab');
    } else {
      return this.tabs[0].name;
    }
  }
}
