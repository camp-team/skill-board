import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSkillPillControl]',
})
export class SkillPillControlDirective {
  constructor(private pillElm: ElementRef) {}

  @HostListener('window:resize')
  resize() {
    // skill-pillが、非mobileかつ幅広の場合に、文字を大きくするためのclassを付加する
    if (
      this.pillElm.nativeElement.offsetHeight >= 128 &&
      this.pillElm.nativeElement.offsetWidth > 446
    ) {
      this.pillElm.nativeElement.classList.add('skill-pill-large-font');
    } else {
      this.pillElm.nativeElement.classList.remove('skill-pill-large-font');
    }
  }
}
