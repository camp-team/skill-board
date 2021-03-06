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
import { Skill } from 'src/app/interfaces/skill';

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

  @Output() appendSkill: EventEmitter<string> = new EventEmitter();

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(500))
      .subscribe((key) => {
        if (key) {
          this.index.search<Skill[]>(key).then((result) => {
            this.autoComplateOptions = result.hits.slice(0, 4);
          });
        } else {
          this.autoComplateOptions = [];
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    // autoComplateのサイズを、pillの要素幅に合わせる
    this.autoComplateWidth = this.elm.nativeElement.clientWidth;
  }

  onSubmit() {
    this.index.search<Skill[]>(this.searchControl.value).then((result) => {
      if (result.hits.length > 0) {
        this.onSelect((result.hits[0] as unknown) as Skill);
      }
    });
  }

  onSelect(skill: Skill) {
    this.appendSkill.emit(skill.skillId);
    this.searchControl.setValue('');
  }
}
