import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './sections/about/about.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { PortadaComponent } from './sections/portada/portada.component';
import { ExperienciaComponent } from './sections/experiencia/experiencia.component';
import { FormacionComponent } from './sections/formacion/formacion.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    PortadaComponent,
    ExperienciaComponent,
    FormacionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'mi-portafolio';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.createStars();
  }

  // ⭐ Tu lógica de estrellas sigue igual
  createStars() {
    const background = this.el.nativeElement.querySelector('.star-background');

    for (let i = 0; i < 200; i++) {
      const star = this.renderer.createElement('div');
      this.renderer.addClass(star, 'star');
      this.renderer.setStyle(star, 'top', `${Math.random() * 100}%`);
      this.renderer.setStyle(star, 'left', `${Math.random() * 100}%`);
      this.renderer.setStyle(
        star,
        'animationDuration',
        `${1 + Math.random() * 2}s`
      );
      this.renderer.appendChild(background, star);
    }

    setInterval(() => {
      const shootingStar = this.renderer.createElement('div');
      this.renderer.addClass(shootingStar, 'shooting-star');
      this.renderer.setStyle(
        shootingStar,
        'left',
        `${Math.random() * window.innerWidth}px`
      );
      this.renderer.setStyle(shootingStar, 'top', `${Math.random() * 100}px`);
      this.renderer.appendChild(background, shootingStar);

      setTimeout(() => {
        this.renderer.removeChild(background, shootingStar);
      }, 3000);
    }, 5000);
  }

  // 📌 Escucha el scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = [
      { id: 'home', navId: 'nav-home' },
      { id: 'about', navId: 'nav-about' },
      { id: 'projects', navId: 'nav-projects' },
    ];

    let currentSection = '';

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) {
        const top = el.offsetTop - 150; // ajusta si tienes navbar fijo
        const bottom = top + el.offsetHeight;
        const scrollPos = window.scrollY;

        if (scrollPos >= top && scrollPos < bottom) {
          currentSection = section.navId;
        }
      }
    }

    for (const section of sections) {
      const link = document.getElementById(section.navId);
      if (link) {
        if (section.navId === currentSection) {
          this.renderer.addClass(link, 'active');
        } else {
          this.renderer.removeClass(link, 'active');
        }
      }
    }
  }
}
