import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  color = '#828689';

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.hover(this.color);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.hover(null);
  }

  private hover(color: string): void {
    this.elementRef.nativeElement.style.backgroundColor = color;
  }

}
