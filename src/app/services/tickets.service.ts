import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  endpoint = 'http://localhost:8080/tickets';

  constructor(private httpClient: HttpClient) { }

  getTickets() {
    return this.httpClient.get(this.endpoint);
  }

  getTicketsById(id_ticket: number) {
    return this.httpClient.get(`${this.endpoint}/${id_ticket}`);
  }

  postTicket(ticket: any) {
    return this.httpClient.post(`${this.endpoint}`, ticket);
  }

  putTicket(ticketId: number, ticketData: any) {
    return this.httpClient.put(`${this.endpoint}/${ticketId}`, ticketData);
  }

  deleteTicket(id_ticket: number) {
    return this.httpClient.delete(`${this.endpoint}/${id_ticket}`);
  }

  getTicketsByType(type: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.endpoint}?type=${type}`);
  }

  marcarComoAdquirido(id_ticket: number): Observable<any> {
    return this.httpClient.patch(`${this.endpoint}/${id_ticket}`, { adquirido: true });
  }

  putTicketActualizar(ticketData: { id_ticket: number, id_compra: null, adquirido: boolean }): Observable<any> {
    return this.httpClient.put(`${this.endpoint}/${ticketData.id_ticket}`, ticketData);
  }
  
  
  
}
