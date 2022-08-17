import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from 'src/app/models/model.module';
import { UserManagementComponent } from './user-management.component';

@NgModule({
  imports: [ModelModule, BrowserModule, FormsModule],
  declarations: [UserManagementComponent],
  exports: [UserManagementComponent],
})
export class UserModule {}
