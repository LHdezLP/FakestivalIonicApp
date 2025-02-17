import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCredentialsPageRoutingModule } from './edit-credentials-routing.module';

import { EditCredentialsPage } from './edit-credentials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCredentialsPageRoutingModule
  ],
  declarations: [EditCredentialsPage]
})
export class EditCredentialsPageModule {}
