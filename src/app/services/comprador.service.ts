import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompradorService {

  endpoint = 'http://localhost:8080/compradores';

  constructor(private httpClient: HttpClient) { }

  getCompradores() {
    return this.httpClient.get(this.endpoint);
  }

  getCompradorById(id: number) {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }

  postComprador(comprador: { nombre: string; apellido: string; direccion: string; dni: string; telefono: string; email: string }): Observable<{ id: number }> {
    return this.httpClient.post<{ id: number }>(this.endpoint, comprador);
  }

  putComprador(comprador: { id: number, nombre: string, apellido: string, direccion: string, dni: string, telefono: string, email: string }) {
    return this.httpClient.put(`${this.endpoint}/${comprador.id}`, comprador);
  }

  deleteComprador(id: number) {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }

  getCompradorByDni(dni: string) {
    return this.httpClient.get(`${this.endpoint}/dni/${dni}`);
  }
}
