import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, StudentRoutingModule, StudentProfileComponent],
  exports: [StudentProfileComponent],
})
export class StudentModule {}
