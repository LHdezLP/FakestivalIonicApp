import { Component } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TicketFormComponent } from '../../components/ticket-form/ticket-form.component';
import { CreateTicketFormComponent } from '../../components/create-ticket-form/create-ticket-form.component';
import { BuyTicketFormComponent } from 'src/app/components/buy-ticket-form/buy-ticket-form.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tickets: any[] = [];

  constructor(private ticketsService: TicketsService, private modalController: ModalController) { }

  ngOnInit() {
    this.getAllTickets();
  }

  getAllTickets() {
    this.ticketsService.getTickets().subscribe((response: any) => {
      this.tickets = response.filter((ticket: any) => !ticket.adquidirdo);
    });
  }

  deleteTicket(id: number) {
    this.ticketsService.deleteTicket(id).subscribe(() => {
      this.getAllTickets();
    }, error => {
      console.error('Error al eliminar el ticket:', error);
    });
  }

  // putTicket(id_ticket: number, type: string, price: number) {
  //   const ticket = { id_ticket, type, price };
  //   this.ticketsService.putTicket(ticket).subscribe(() => {
  //     this.getAllTickets();
  //   }, error => {
  //     console.error('Error al actualizar el ticket:', error);
  //   });
  // }

  // Modal para hacer put
  async openTicketForm(ticket: any) {
    const modal = await this.modalController.create({
      component: TicketFormComponent,
      componentProps: {
        ticket,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.updated) {
      this.getAllTickets();
    }
  }

  // Modal para hacer post
  async openCreateTicketForm() {
    const modal = await this.modalController.create({
      component: CreateTicketFormComponent,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.added) {
      this.getAllTickets();
    }
  }

  // Modal para rellenar datos de compra
  async openBuyTicketForm(ticket: any) {
    const modal = await this.modalController.create({
      component: BuyTicketFormComponent,
      componentProps: {
        ticket,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.updated) {
      this.getAllTickets();
    }
  }
}
