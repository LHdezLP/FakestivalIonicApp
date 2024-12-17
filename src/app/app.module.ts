import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor'; 

import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { CreateTicketFormComponent } from './components/create-ticket-form/create-ticket-form.component';
import { BuyTicketFormComponent } from './components/buy-ticket-form/buy-ticket-form.component';
import { TicketPanelComponent } from './components/ticket-panel/ticket-panel.component';
import { DetalleCompraFormComponent } from './components/detalle-compra-form/detalle-compra-form.component';
import { ModificarDetalleCompraComponent } from './components/modificar-detalle-compra/modificar-detalle-compra.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketFormComponent,
    CreateTicketFormComponent,
    BuyTicketFormComponent,
    
    DetalleCompraFormComponent,
    ModificarDetalleCompraComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TicketPanelComponent,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true } 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
