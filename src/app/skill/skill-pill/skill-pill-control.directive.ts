import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appSkillPillControl]',
})
export class SkillPillControlDirective implements AfterViewInit {
  constructor(private pillElm: ElementRef) {}

  ngAfterViewInit() {
    this.resize();
  }

  @HostListener('window:resize', ['$event'])
  resize() {
    // skill-pillが、非mobileかつ幅広の場合に、文字を大きくするためのclassを付加する
    if (
      this.pillElm.nativeElement.offsetHeight >= 128 &&
      this.pillElm.nativeElement.offsetWidth > 446
    ) {
      this.pillElm.nativeElement.classList.add('skill-pill-large');
    } else {
      this.pillElm.nativeElement.classList.remove('skill-pill-large');
    }
  }
}
