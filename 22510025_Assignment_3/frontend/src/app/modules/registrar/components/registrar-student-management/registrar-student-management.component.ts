import { Component, OnInit } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RegistrarActionService } from '../../services/registrar-action.service';
import Swal from 'sweetalert2';
import {
  AddActionResponse,
  NewStudent,
} from './registrar-student-management.model';

@Component({
  selector: 'app-registrar-student-management',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-student-management.component.html',
  styleUrl: './registrar-student-management.component.css',
})
export class RegistrarStudentManagementComponent implements OnInit {
  user$: Observable<User | null>;
  addStudentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private registrarActionService: RegistrarActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.addStudentForm = this.formBuilder.group({
      studentId: ['', Validators.required],
      name: ['', Validators.required],
      deptName: ['', Validators.required],
    });
  }

  onAddStudent() {
    if (this.addStudentForm.valid) {
      const addStudentFormValues: NewStudent = this.addStudentForm.value;
      this.registrarActionService
        .addNewStudent(addStudentFormValues)
        .subscribe({
          next: (response: AddActionResponse) => {
            console.log(
              '🚀 ~ RegistrarStudentManagementComponent ~ onAddStudent ~ response:',
              response
            );
            Swal.fire('Success', 'New Student Added Successfully', 'success');
            this.addStudentForm.reset();
          },
          error: (err) => {
            Swal.fire('Error', 'Error while adding student !', 'error');
          },
        });
    } else {
      Swal.fire('Error', 'Please fill all the fields', 'error');
    }
  }
}
