import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    LogoutDialogComponent,
  ],
  exports: [LogoutDialogComponent],
})
export class AuthModule {}
