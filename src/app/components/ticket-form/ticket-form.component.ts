/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss'],
})
export class TicketFormComponent {
  @Input() ticket: any; 

  constructor(
    private modalController: ModalController,
    private ticketsService: TicketsService 
  ) {}

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

  // putTicket() {
  //   const updatedTicket = { 
  //     id_ticket: this.ticket.id_ticket, 
  //     type: this.ticket.type, 
  //     price: this.ticket.price 
  //   };

    
  //   this.ticketsService.putTicket(updatedTicket).subscribe(
  //     (response) => {
        
  //       this.modalController.dismiss({ updated: true });
  //     },
  //     (error) => {
  //       console.error('Error al actualizar el ticket:', error);
  //     }
  //   );
  // }
}
