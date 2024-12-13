import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-compra-form',
  templateUrl: './detalle-compra-form.component.html',
  styleUrls: ['./detalle-compra-form.component.scss'],
})
export class DetalleCompraFormComponent {
  @Input() comprador: any;
  @Input() compra: any;
  @Input()
  tickets: any[] = [];

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
