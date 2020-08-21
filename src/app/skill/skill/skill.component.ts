import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SkillService } from 'src/app/services/skill.service';
import { take } from 'rxjs/operators';
import { SkillsHeaderModel } from '../model/skills-header.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent implements OnInit {
  skillHeaderModel: SkillsHeaderModel;

  isSkillPillLargeFont: boolean;
  isShowSkillPillSearch: boolean;
  readonly maxSkillPillsLength = 5; // スキル欄の最大数

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    this.skillService
      .getAllSkillMap()
      .pipe(take(1))
      .subscribe((allSkillMap) => {
        this.skillHeaderModel = new SkillsHeaderModel(allSkillMap);

        this.route.queryParamMap.subscribe((paramMap) => {
          this.skillHeaderModel.setParam(paramMap);
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
      window.innerWidth >= 960 && this.skillHeaderModel.skills.length < 4;

    // 検索欄はskillが最大件数未満の場合のみ表示
    this.isShowSkillPillSearch =
      this.skillHeaderModel.skills.length < this.maxSkillPillsLength;
  }

  onRemoveSkill(skillId: string) {
    if (this.skillHeaderModel.removeSkill(skillId)) {
      this.updateParams(this.skillHeaderModel.toParam()); // 成功時のみパラメータ更新
    }
  }

  onAppendSkill(skillId: string) {
    if (this.skillHeaderModel.appendSkill(skillId)) {
      this.updateParams(this.skillHeaderModel.toParam()); // 成功時のみパラメータ更新
    }
  }

  private updateParams(params: object) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: params,
    });
  }
}
