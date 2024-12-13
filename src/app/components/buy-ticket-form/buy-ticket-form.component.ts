import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CompraService } from 'src/app/services/compra.service';
import { CompradorService } from 'src/app/services/comprador.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { DetalleCompraFormComponent } from '../detalle-compra-form/detalle-compra-form.component';

@Component({
  selector: 'app-buy-ticket-form',
  templateUrl: './buy-ticket-form.component.html',
  styleUrls: ['./buy-ticket-form.component.scss'],
})
export class BuyTicketFormComponent implements OnInit {
  @Input() tickets: any[] = []; 
  comprador: any = {};

  constructor(
    private modalController: ModalController,
    private ticketsService: TicketsService,
    private compraService: CompraService,
    private compradorService: CompradorService
  ) {}

  ngOnInit() {
      if (!Array.isArray(this.tickets) || this.tickets.length === 0) {
          console.error('No se recibió un array válido de tickets.');
          return;
      }

      console.log('Tickets recibidos:', this.tickets);
  }

  close() {
      this.modalController.dismiss();
  }

//   Las validaciones fueron añadidas post-defensa de la aplicación.
  postCompra() {
    if (!this.comprador.nombre || !this.comprador.apellido || !this.comprador.direccion || !this.comprador.dni || !this.comprador.telefono || !this.comprador.email) {
        console.error('Faltan datos obligatorios.');
        return;  
    }

    this.compradorService.getCompradorByDni(this.comprador.dni).subscribe(
        (compradorResponse: any) => {
            const compradorId = compradorResponse ? compradorResponse.id : null;

            if (compradorId) {
                console.log('Comprador encontrado con id:', compradorId);
                this.crearCompra(compradorId);
            } else {
                this.crearNuevoComprador();
            }
        },
        (error) => {
            console.error('Error al verificar el comprador:', error);
            this.crearNuevoComprador();
        }
    );
}



  crearNuevoComprador() {
      const nuevoComprador = {
          nombre: this.comprador.nombre,
          apellido: this.comprador.apellido,
          direccion: this.comprador.direccion,
          dni: this.comprador.dni,
          telefono: this.comprador.telefono,
          email: this.comprador.email,
      };

      this.compradorService.postComprador(nuevoComprador).subscribe(
          (nuevoCompradorResponse: any) => {
              console.log('Nuevo comprador creado con id:', nuevoCompradorResponse.id);
              this.crearCompra(nuevoCompradorResponse.id);
          },
          (error) => console.error('Error al registrar el comprador:', error)
      );
  }

  crearCompra(compradorId: number) {
      if (!Array.isArray(this.tickets) || this.tickets.length === 0) {
          console.error("El array de tickets está vacío o no es válido.");
          return;
      }

      const ticketsArray = this.tickets.map((t: any) => ({ id: t.id }));

      const createCompra = {
          comprador: { id: compradorId },
          tickets: ticketsArray,
      };

      console.log('Datos para crear la compra:', createCompra);

      this.compraService.postCompra(createCompra).subscribe(
          (compraResponse: any) => {
              ticketsArray.forEach(ticket => {
                  this.ticketsService.marcarComoAdquirido(ticket.id).subscribe(
                      () => console.log(`Ticket ${ticket.id} marcado como adquirido`),
                      (error) => console.error(`Error al marcar el ticket ${ticket.id} como adquirido:`, error)
                  );
              });

              this.modalController.dismiss({ updated: true });
              this.showDetalleCompra(compraResponse, ticketsArray);
          },
          (error) => console.error('Error al registrar la compra:', error)
      );
  }

  async showDetalleCompra(compra: any, tickets: any[]) {
    const modal = await this.modalController.create({
      component: DetalleCompraFormComponent,
      componentProps: {
        comprador: this.comprador,
        compra: compra,
        tickets: this.tickets 
      },
    });
    await modal.present();
  }
}
