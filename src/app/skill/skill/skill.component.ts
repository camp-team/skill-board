import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SkillService } from 'src/app/services/skill.service';
import { Skill } from 'functions/src/interface/skill';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent implements OnInit {
  // TODO
  readonly allSkillMap = new Map<string, Skill>(); // <skillId, skill>
  skillIds: string[];

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.skillService
      .getSkills()
      .pipe(take(1))
      .subscribe((skills) => {
        console.log('getSkills.subscribe');

        // まずskillデータを全読み込み(数10件程度なので、都度アクセスさせず最初に読み込んでしまう)
        skills.forEach((skill) => this.allSkillMap.set(skill.skillId, skill));
        console.log('this.skillMap:' + JSON.stringify(this.allSkillMap));

        this.route.queryParamMap.subscribe((map) => {
          // 重複排除のため、一度setを経由する
          this.skillIds = Array.from(new Set(map.get('skills')?.split(',')));
          this.refleshViewProperties();
        });
      });
  }

  @HostListener('window:resize', ['$event'])
  doWindowResize(event) {
    this.refleshViewProperties();
  }

  refleshViewProperties() {
    // 幅広 かつ 4カラム以下(検索欄込み)の場合、skill-pill内のfontを大きくする
    this.isSkillPillLargeFont =
      window.innerWidth >= 960 && this.skillIds.length < 4;

    // 検索欄はskillが最大件数未満の場合のみ表示
    this.isShowSkillPillSearch =
      this.skillIds.length < this.maxSkillPillsLength;
  }

  onRemoveSkillPill(removeSkillId: string) {
    // 該当のskillIdをqueryParamから除外
    this.updateParams({
      skills: this.skillIds
        .filter((skillId) => skillId !== removeSkillId)
        .join(','),
    });
  }

  onSearchSelectSkillPill(selectSkillId: string) {
    if (this.skillIds.includes(selectSkillId)) {
      return; // 重複時は追加しない
    }

    this.skillIds.push(selectSkillId);

    this.updateParams({
      skills: this.skillIds.join(','),
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

  // TODO #115にて実装見直し
  getSkill(skillId: string): Skill {
    return this.allSkillMap.get(skillId);
  }
}
