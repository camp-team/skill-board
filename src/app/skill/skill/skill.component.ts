import {
  Component,
  OnInit,
  AfterViewChecked,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent implements OnInit, AfterViewChecked {
  skills: string[];
  isSkillPillLargeFont: boolean;
  isShowSkillPillSearch: boolean;
  readonly maxSkillPillsLength = 5; // スキル欄の最大数

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
      // TODO skillIdの重複対策
      this.skills = map.get('skills')?.split(',');
    });
  }

  ngAfterViewChecked(): void {
    // ExpressionChangedAfterItHasBeenCheckedError対策(setTimeoutでプロパティ書き換えを処理を非同期化してエラー回避)
    setTimeout(() => {
      // 幅広 かつ 4カラム以下(検索欄込み)の場合、skill-pill内のfontを大きくする
      this.isSkillPillLargeFont =
        window.innerWidth >= 960 && this.skills.length < 4;

      // 検索欄はskillが最大件数未満の場合のみ表示
      this.isShowSkillPillSearch =
        this.skills.length < this.maxSkillPillsLength;
    }, 0);
  }

  onRemoveSkillPill(removeSkillId: string) {
    // 該当のskillIdをqueryParamから除外
    this.updateParams({
      skills: this.skills
        .filter((skillId) => skillId !== removeSkillId)
        .join(','),
    });
  }

  onSearchSelectSkillPill(seletSkillId: string) {
    console.log('onSearchSelectSkillPill');

    this.skills.push(seletSkillId);

    // TODO skillIdの重複対策
    this.updateParams({
      skills: this.skills.join(','),
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
