import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent implements OnInit {
  skills: string[];
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((map) => {
      this.skills = map.get('skills')?.split(',');
    });
  }

  onRemoveSkillPill(removeSkillId: string) {
    console.log('onSkillPillDelete:' + removeSkillId);

    // 該当のskillIdをqueryParamから除外
    this.updateParams({
      skills: this.skills
        .filter((skillId) => skillId !== removeSkillId)
        .join(','),
    });
  }

  private updateParams(params: object) {
    console.log('updateParams' + JSON.stringify(params));
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: params,
    });
  }
}
