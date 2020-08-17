import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SkillService } from 'src/app/services/skill.service';
import { startWith, debounceTime } from 'rxjs/operators';
import { Skill } from 'functions/src/interface/skill';

@Component({
  selector: 'app-skill-search-pill',
  templateUrl: './skill-search-pill.component.html',
  styleUrls: ['./skill-search-pill.component.scss'],
})
export class SkillSearchPillComponent implements OnInit {
  @Input() isLargeFont: boolean;

  searchControl = new FormControl('');
  autoComplateOptions = [];
  autoComplateWidth: number;
  index = this.skillService.index.skills;

  @ViewChild('skillPill') elm: ElementRef;

  @Output() addPill: EventEmitter<string> = new EventEmitter();

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

  @HostListener('window:resize', ['$event'])
  doWindowResize(event) {
    // autoComplateのサイズを、pillの要素幅に合わせる
    this.autoComplateWidth = this.elm.nativeElement.clientWidth;
  }

  doSearchSkillKeyDown(event: KeyboardEvent) {
    // input中にenter押下で、1番目の候補を選択したと見なす
    // 入力から更新にラグを設けているのでautoComplateOptionsの値は使わず、直接検索実施する。
    if (event.key === 'Enter') {
      this.index.search<Skill[]>(this.searchControl.value).then((result) => {
        if (result.hits.length > 0) {
          this.doSelect((result.hits[0] as unknown) as Skill);
        }
      });
    }
  }

  doSelect(skill: Skill) {
    this.addPill.emit(skill.skillId);
    this.searchControl.setValue('');
  }
}
