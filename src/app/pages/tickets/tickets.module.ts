import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsPageRoutingModule } from './tickets-routing.module';

import { TicketsPage } from './tickets.page';
import { AppModule } from 'src/app/app.module';
import { TicketPanelComponent } from 'src/app/components/ticket-panel/ticket-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsPageRoutingModule,
    TicketPanelComponent
  ],
  declarations: [TicketsPage]
})
export class TicketsPageModule {}
