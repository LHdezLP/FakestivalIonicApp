/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-create-ticket-form',
  templateUrl: './create-ticket-form.component.html',
  styleUrls: ['./create-ticket-form.component.scss'],
})
export class CreateTicketFormComponent {

  
  ticket: any = {
    type: '',
    price: null
  };

  constructor(
    private modalController: ModalController,
    private ticketsService: TicketsService  
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

  
  close() {
    this.modalController.dismiss();
  }

  
  postTicket() {
    
    this.ticketsService.postTicket(this.ticket).subscribe(
      (response) => {
        
        this.modalController.dismiss({ added: true });
      },
      (error) => {
        console.error('Error al añadir el ticket:', error);
      }
    );
  }
}
