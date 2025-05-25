import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './sections/about/about.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ContactComponent } from './sections/contact/contact.component';
import { PortadaComponent } from './sections/portada/portada.component';
import { ExperienciaComponent } from './sections/experiencia/experiencia.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent,
    PortadaComponent,
    ExperienciaComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'mi-portafolio';
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    const background = this.el.nativeElement.querySelector('.star-background');

    // 🌟 Crear estrellas fijas
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

    // 💫 Estrellas fugaces
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
}
