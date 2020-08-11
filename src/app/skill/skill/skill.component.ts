import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SkillPillComponent } from '../skill-pill/skill-pill.component';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent implements OnInit, AfterViewChecked {
  skills: string[];

  @ViewChildren(SkillPillComponent) pillList: QueryList<SkillPillComponent>;

  // TODO #115にて実装見直し
  // https://github.com/camp-team/skill-board/issues/115
  private readonly skillColorScheme = [
    '#0096EF',
    '#FF443E',
    '#FFCA43',
    '#2FA04E',
    '#A228AD',
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((map) => {
      this.skills = map.get('skills')?.split(',');
    });
  }

  ngAfterViewChecked(): void {
    // pillの追加・削除によって、幅が変わるので、resize処理を実行
    this.pillList.forEach((pill) => pill.doResizePill());
  }

  onRemoveSkillPill(removeSkillId: string) {
    // 該当のskillIdをqueryParamから除外
    this.updateParams({
      skills: this.skills
        .filter((skillId) => skillId !== removeSkillId)
        .join(','),
    });
  }

  private updateParams(params: object) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: params,
    });
  }

  // TODO #115にて実装見直し
  // https://github.com/camp-team/skill-board/issues/115
  getSkillColor(index: number): string {
    return this.skillColorScheme[(index + 5) % 5];
  }
}
