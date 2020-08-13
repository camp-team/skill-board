import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SkillService } from 'src/app/services/skill.service';
import { startWith, debounceTime, tap } from 'rxjs/operators';
import { Skill } from 'functions/src/interface/skill';

@Component({
  selector: 'app-skill-search-pill',
  templateUrl: './skill-search-pill.component.html',
  styleUrls: ['./skill-search-pill.component.scss'],
})
export class SkillSearchPillComponent implements OnInit, AfterViewChecked {
  @Input() isLargeFont: boolean;

  searchControl = new FormControl('');
  autoComplateOptions = [];
  autoComplateWidth: number;
  index = this.skillService.index.skills;

  @ViewChild('skillPill') elm: ElementRef;

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(500))
      .subscribe((key) => {
        this.index.search<Skill[]>(key).then((result) => {
          this.autoComplateOptions = result.hits.slice(0, 4);
        });
      });
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      // autoComplateのサイズを、pillの要素幅に合わせる
      this.autoComplateWidth = this.elm.nativeElement.clientWidth;
    }, 0); // ExpressionChangedAfterItHasBeenCheckedError対策(setTimeoutでプロパティ書き換えを処理を非同期化してエラー回避)
  }

  doSearchSkillKeyDown(event: KeyboardEvent) {
    console.log('doSearchSkillKeyDown');
    // input中にenter押下で、1番目の候補を選択したと見なす
    if (event.key === 'Enter' && this.autoComplateOptions.length > 0) {
      this.doSelect(this.autoComplateOptions[0]);
    }
  }

  doSelect(skill: Skill) {
    console.log('doSelect:' + JSON.stringify(skill));
  }

  doSubmit(searchQuery: string) {
    console.log('doSubmit');
  }
}
