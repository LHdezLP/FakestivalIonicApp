import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CompraService } from 'src/app/services/compra.service';
import { CompradorService } from 'src/app/services/comprador.service';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-modificar-detalle-compra',
  templateUrl: './modificar-detalle-compra.component.html',
  styleUrls: ['./modificar-detalle-compra.component.scss'],
})
export class ModificarDetalleCompraComponent {
  identificador!: string; 
  compra: any; 
  comprador: any; 

  constructor(
    private modalController: ModalController,
    private compraService: CompraService,
    private compradorService: CompradorService,
    private ticketsService: TicketsService
  ) {}

  close() {
    this.modalController.dismiss();
  }

  buscarCompra(callback?: () => void) {
    if (!this.identificador) {
      alert('Por favor, ingrese un identificador de compra.');
      return;
    }
  
    this.compraService.getCompraByIdentificador(this.identificador).subscribe(
      (compra) => {
        this.compra = compra;
        this.comprador = compra.comprador;
        this.compra.tickets = compra.tickets;
        if (callback) callback();
      },
      (error) => {
        console.error('Error al buscar compra:', error);
        alert('Compra no encontrada.');
      }
    );
  }

  actualizarDatos() {
    if (!this.comprador) {
      alert('Por favor, ingrese los datos del comprador.');
      return;
    }

    this.compradorService.putComprador(this.comprador).subscribe(
      () => {
        alert('Datos actualizados correctamente, puede cerrar esta ventana si lo desea.');
      },
      (error) => {
        alert('Error al actualizar los datos');
      }
    );
  }

  cancelarCompra() {
    if (!this.compra) {
      alert('No se puede cancelar una compra no encontrada.');
      return;
    }
  
    this.compraService.deleteCompra(this.compra.id).subscribe(
      () => {
        alert('Compra cancelada correctamente.');
        this.close(); 
      },
      (error) => {
        console.error('Error al cancelar la compra:', error);
        alert('Error al cancelar la compra. Es posible que ya haya sido eliminada.');
      }
    );
  }

  eliminarTicket(ticket: any) {
    if (!this.compra || !ticket) {
      alert('No se puede eliminar un ticket que no existe.');
      return;
    }
  
    this.compraService.eliminarTicketDeCompra(this.compra.id, ticket.id).subscribe(
      () => {
        this.buscarCompra(() => {
          if (this.compra.tickets.length === 0) {
            this.cancelarCompra();
          } else {
            alert('Ticket eliminado correctamente.');
          }
        });
      },
      (error) => {
        console.error('Error al eliminar el ticket:', error);
        alert('Error al eliminar el ticket.');
      }
    );
  }
  
}
