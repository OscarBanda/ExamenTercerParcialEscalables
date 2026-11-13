import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Nota } from '../models/nota.model';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/notas';

  // Señal WritableSignal para almacenar el arreglo de notas
  notas: WritableSignal<Nota[]> = signal<Nota[]>([]);

  // Método para cargar todas las notas desde el backend
  cargarNotas(): void {
    this.http.get<Nota[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.notas.set(data);
      },
      error: (err) => {
        console.error('Error al cargar las notas:', err);
      }
    });
  }

  // Método para agregar una nueva nota y actualizar la señal local sin recargar
  agregarNota(nuevaNota: { titulo: string; contenido: string }): void {
    this.http.post<Nota>(this.apiUrl, nuevaNota).subscribe({
      next: (notaCreada) => {
        // Actualización de la señal local para reflejar el cambio de inmediato
        this.notas.update((listaActual) => [notaCreada, ...listaActual]);
      },
      error: (err) => {
        console.error('Error al agregar la nota:', err);
      }
    });
  }
}
