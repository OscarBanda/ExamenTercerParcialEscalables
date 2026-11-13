import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotaService } from './services/nota.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly notaService = inject(NotaService);

  // Señales para el formulario
  titulo = signal('');
  contenido = signal('');

  ngOnInit(): void {
    this.notaService.cargarNotas();
  }

  guardar(): void {
    const tit = this.titulo().trim();
    const cont = this.contenido().trim();

    if (!tit || !cont) {
      alert('Por favor ingresa tanto el título como el contenido.');
      return;
    }

    // Llamar al método del servicio
    this.notaService.agregarNota({ titulo: tit, contenido: cont });

    // Limpiar formulario
    this.titulo.set('');
    this.contenido.set('');
  }
}
