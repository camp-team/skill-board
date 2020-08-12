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
    // 幅広 かつ 4カラム以下の場合、skill-pill内のfontを大きくする
    const isSkillPillLargeFont =
      window.innerWidth >= 960 && this.skills.length <= 4; // TODO 検索欄が追加された場合、lenghtの判定を修正 #117
    this.pillList.forEach((pill) => (pill.isLargeFont = isSkillPillLargeFont));
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
