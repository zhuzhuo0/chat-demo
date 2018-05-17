import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'ion-textarea[autoresize]' // Attribute selector
})
export class TextareaAutoresizeDirective {

  @HostListener("input", ["$event.target"])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  // @HostListener("focus", ["$event.target"])
  // onfocus(textArea: HTMLTextAreaElement): void {
  //   this.showSendBtn();
  // }

  // @HostListener("blur", ["$event.target"])
  // onblur(textArea: HTMLTextAreaElement): void {
  //   this.hideSendBtn();
  // }

  constructor(public element: ElementRef) {
  }

  ngOnInit(): void {
    // this.adjust();
  }

  adjust(): void {
    event.preventDefault();
    event.stopPropagation();
    let ta = this.element.nativeElement.querySelector("textarea");
    ta.style.overflow = "hidden";
    ta.style.height = "auto";
    if (ta.scrollHeight == 54) {
      ta.style.height = "36px";
    } else {
      ta.style.height = ta.scrollHeight + "px";
    }
    if (ta.value === '') {
      ta.style.height = "36px";
    }
  }

}
