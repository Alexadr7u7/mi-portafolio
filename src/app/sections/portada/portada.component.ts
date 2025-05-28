import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import 'aos/dist/aos.css';
@Component({
  selector: 'app-portada',
  imports: [CommonModule],
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.css',
})
export class PortadaComponent {
  descargando = false;

  descargarCV() {
    this.descargando = true;

    // Crear enlace de descarga
    const enlace = document.createElement('a');
    enlace.href = 'assets/Alan Alexander Lazcano Romero Cv.pdf';
    enlace.download = 'CV-Alexander-Lazcano';
    enlace.click();

    // Simula tiempo de descarga (1.5s aprox.)
    setTimeout(() => {
      this.descargando = false;
    }, 1000);
  }
}
