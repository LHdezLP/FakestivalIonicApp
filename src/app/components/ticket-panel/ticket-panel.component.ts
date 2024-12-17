import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TicketsService } from 'src/app/services/tickets.service';
import { BuyTicketFormComponent } from '../buy-ticket-form/buy-ticket-form.component';
import { ModificarDetalleCompraComponent } from '../modificar-detalle-compra/modificar-detalle-compra.component';

interface Ticket {
  id: number;
  adquirido: boolean;
  identifier: string;
  price: number;
  type: string; 
  id_compra: number | null;
}

@Component({
  selector: 'app-ticket-panel',
  templateUrl: './ticket-panel.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  styleUrls: ['./ticket-panel.component.scss']
})
export class TicketPanelComponent {

  tickets: Ticket[] = [];
  counts = { 'Standard Pass': 0, 'VIP Pass': 0, 'Premium Pass': 0 };

  constructor(private ticketsService: TicketsService, private modalController: ModalController) { }

  ngOnInit() {
    this.getAllTickets();
    console.log(this.tickets);
  }

  getAllTickets() {
    this.ticketsService.getTickets().subscribe((response: any) => {
      this.tickets = response.filter((ticket: Ticket) => !ticket.adquirido);
      console.log('Tickets disponibles:', this.tickets);
    });
  }

  handleCounterChange(type: 'Standard Pass' | 'VIP Pass' | 'Premium Pass', value: number) {
    this.counts[type] = Math.min(5, Math.max(0, this.counts[type] + value));
  }

  proceed() {
    const ticketsToBuy: Ticket[] = [];

    if (this.counts['Standard Pass'] > 0) {
      this.addTicketsToBuy(ticketsToBuy, 'Standard Pass', this.counts['Standard Pass']);
    }
    if (this.counts['VIP Pass'] > 0) {
      this.addTicketsToBuy(ticketsToBuy, 'VIP Pass', this.counts['VIP Pass']);
    }
    if (this.counts['Premium Pass'] > 0) {
      this.addTicketsToBuy(ticketsToBuy, 'Premium Pass', this.counts['Premium Pass']);
    }

    if (ticketsToBuy.length === 0) {
      alert('Please select at least one ticket to proceed.');
      return;
    }

    console.log('Tickets to proceed with:', ticketsToBuy);

    this.openBuyTicketForm(ticketsToBuy);
  }

  addTicketsToBuy(ticketsToBuy: Ticket[], type: string, quantity: number) {
    console.log(`Filtering tickets for type: ${type}`);

    const availableTickets = this.tickets.filter(ticket => ticket.type === type && !ticket.adquirido);

    console.log(`Available tickets for ${type}:`, availableTickets);

    const ticketsToAdd = availableTickets.slice(0, quantity);

    console.log(`Tickets to add for ${type}:`, ticketsToAdd);

    ticketsToAdd.forEach(ticket => {
      if (!ticket.type) {
        console.error("Missing type in ticket", ticket);
      }
      
      ticketsToBuy.push({
        id: ticket.id,
        adquirido: ticket.adquirido,
        identifier: ticket.identifier,
        price: ticket.price,
        type: ticket.type,
        id_compra: ticket.id_compra
      });
    });
  }

  async openBuyTicketForm(tickets: Ticket[]) {
    const modal = await this.modalController.create({
      component: BuyTicketFormComponent,
      componentProps: { tickets }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.updated) {
      this.getAllTickets();
    }
  }

  async openCompraModal() {
    const modal = await this.modalController.create({
      component: ModificarDetalleCompraComponent
    });
  
    await modal.present();
  }
}
