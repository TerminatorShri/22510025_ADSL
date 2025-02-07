import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../../../store/types/auth.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { HodActionService } from '../../services/hod-action.service';
import Swal from 'sweetalert2';
import {
  AddFunds,
  AssignInstructor,
  AssignInstructorToStudent,
  ChangeSalary,
} from './hod-management.model';

@Component({
  selector: 'app-hod-management',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hod-management.component.html',
  styleUrl: './hod-management.component.css',
})
export class HodManagementComponent implements OnInit {
  user$: Observable<User | null>;
  changeSalaryForm!: FormGroup;
  addFundsForm!: FormGroup;
  assignInstructorForm!: FormGroup;
  assignInstructorToStudentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private hodActionService: HodActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.changeSalaryForm = this.formBuilder.group({
      instructorId: ['', Validators.required],
      newSalary: ['', [Validators.required, Validators.min(29000)]],
    });

    this.addFundsForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(0)]],
    });

    this.assignInstructorForm = this.formBuilder.group({
      instructorId: ['', Validators.required],
      courseId: ['', Validators.required],
      secId: ['', Validators.required],
      semester: ['', Validators.required],
      year: ['', Validators.required],
    });

    this.assignInstructorToStudentForm = this.formBuilder.group({
      studentId: ['', Validators.required],
      instructorId: ['', Validators.required],
    });
  }

  onChangeSalary(): void {
    if (this.changeSalaryForm.valid) {
      const changeSalaryValues: ChangeSalary = this.changeSalaryForm.value;
      this.user$.subscribe((user) => {
        if (user?.dept_name) {
          this.hodActionService
            .updateInstructorSalary(
              changeSalaryValues.instructorId,
              changeSalaryValues.newSalary,
              user.dept_name
            )
            .subscribe({
              next: (response) => {
                Swal.fire('Success', 'Salary updated successfully', 'success');
                this.changeSalaryForm.reset();
              },
              error: (error) => {
                Swal.fire('Error', 'Failed to update salary', 'error');
              },
            });
        }
      });
    } else {
      Swal.fire('Error', 'Please fill all the fields', 'error');
    }
  }

  onAddFunds(): void {
    if (this.addFundsForm.valid) {
      const addFundsValues: AddFunds = this.addFundsForm.value;
      this.user$.subscribe((user) => {
        if (user?.dept_name) {
          this.hodActionService
            .addFundsToDepartment(user.dept_name, addFundsValues.amount)
            .subscribe({
              next: (response) => {
                Swal.fire('Success', 'Funds added successfully', 'success');
                this.addFundsForm.reset();
              },
              error: (error) => {
                Swal.fire('Error', 'Failed to add funds', 'error');
              },
            });
        }
      });
    } else {
      Swal.fire('Error', 'Please fill all the fields', 'error');
    }
  }

  onAssignInstructor(): void {
    if (this.assignInstructorForm.valid) {
      const assignInstructorValues: AssignInstructor =
        this.assignInstructorForm.value;
      this.user$.subscribe((user) => {
        if (user?.dept_name) {
          this.hodActionService
            .assignInstructorToCourse(
              assignInstructorValues.instructorId,
              assignInstructorValues.courseId,
              assignInstructorValues.secId,
              assignInstructorValues.semester,
              assignInstructorValues.year,
              user.dept_name
            )
            .subscribe({
              next: (response) => {
                Swal.fire(
                  'Success',
                  'Instructor assigned to course successfully',
                  'success'
                );
              },
              error: (error) => {
                Swal.fire(
                  'Error',
                  'Failed to assign instructor to course',
                  'error'
                );
              },
            });
        }
      });
    } else {
      Swal.fire('Error', 'Please fill all the fields', 'error');
    }
  }

  onAssignInstructorToStudent(): void {
    if (this.assignInstructorToStudentForm.valid) {
      const assignInstructorToStudentValues: AssignInstructorToStudent =
        this.assignInstructorToStudentForm.value;
      this.user$.subscribe((user) => {
        if (user?.dept_name) {
          this.hodActionService
            .assignInstructorToStudent(
              assignInstructorToStudentValues.studentId,
              assignInstructorToStudentValues.instructorId,
              user.dept_name
            )
            .subscribe({
              next: (response) => {
                Swal.fire(
                  'Success',
                  'Instructor assigned to student successfully',
                  'success'
                );
                this.assignInstructorToStudentForm.reset();
              },
              error: (error) => {
                Swal.fire(
                  'Error',
                  'Failed to assign instructor to student',
                  'error'
                );
              },
            });
        }
      });
    }
  }
}
