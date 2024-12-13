import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  endpoint = 'http://localhost:8080/compras';

  constructor(private httpClient: HttpClient) { }

  getCompras() {
    return this.httpClient.get(this.endpoint);
  }

  getCompraById(id: number) {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }

  postCompra(compra: { comprador: { id: number }, tickets: { id: number }[] }) {
    return this.httpClient.post(this.endpoint, compra).pipe(
      catchError(error => {
        console.error('Error en la solicitud de compra:', error);
        throw error;
      })
    );
  }

  putCompra(compra: { id: number, comprador: { id: number }, tickets: { id_ticket: number }[] }) {
    return this.httpClient.put(`${this.endpoint}/${compra.id}`, compra);
  }

  deleteCompra(id: number): Observable<any> {
    return this.httpClient.delete(`${this.endpoint}/${id}`, {
      responseType: 'json'
    });
  }


  getCompraByIdentificador(identificador: string): Observable<any> {
    return this.httpClient.get(`${this.endpoint}/identificador/${identificador}`);
  }

  eliminarTicketDeCompra(idCompra: number, idTicket: number): Observable<any> {
    return this.httpClient.delete(`${this.endpoint}/${idCompra}/tickets/${idTicket}`, {
      responseType: 'json'
    });
  }
}


