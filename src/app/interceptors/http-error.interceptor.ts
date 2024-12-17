import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { AlertController } from '@ionic/angular'; 

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private alertController: AlertController) {} 

  intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    return handler.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status >= 500) {
            this.showAlert('Error del servidor', 'El servidor no está disponible en este momento. Por favor, inténtelo más tarde.');
          } else if (error.status === 0) {
            this.showAlert('Error de conexión', 'No se pudo conectar con el servidor. Por favor, revise su conexión a internet.');
          }
          return throwError(() => error);
        } else {
          return throwError(() => new Error('Un error desconocido ocurrió'));
        }
      })
    );
  }
  

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
