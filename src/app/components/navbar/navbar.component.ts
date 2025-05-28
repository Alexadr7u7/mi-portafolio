import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
declare const bootstrap: any;

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  private globalClickUnlistener!: () => void;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Cerrar al hacer clic en cualquier enlace
    const links = this.el.nativeElement.querySelectorAll('.nav-link');
    links.forEach((link: HTMLElement) => {
      this.renderer.listen(link, 'click', () => {
        this.collapseNavbar();
      });
    });

    // Cerrar al hacer clic fuera del menú
    this.globalClickUnlistener = this.renderer.listen(
      'document',
      'click',
      (event: Event) => {
        const clickedInside = this.el.nativeElement.contains(event.target);
        if (!clickedInside) {
          this.collapseNavbar();
        }
      }
    );
  }

  collapseNavbar() {
    const collapseElement = this.navbarCollapse.nativeElement;
    if (collapseElement.classList.contains('show')) {
      // Usa Bootstrap collapse para cerrar correctamente
      const collapseInstance = bootstrap.Collapse.getInstance(collapseElement);
      if (collapseInstance) {
        collapseInstance.hide();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.globalClickUnlistener) {
      this.globalClickUnlistener();
    }
  }
}
