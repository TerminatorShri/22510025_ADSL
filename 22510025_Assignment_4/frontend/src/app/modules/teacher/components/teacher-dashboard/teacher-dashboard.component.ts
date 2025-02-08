import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TecherActionService } from '../../services/techer-action.service';
import { User } from '../../../../store/types/auth.model';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { logout } from '../../../../store/actions/auth.actions';
import { DialogBoxComponent } from '../../../../components/dialog-box/dialog-box.component';
import { DialogData } from '../../../../components/dialog-box/dialog-box.model';
import {
  CreateExamRequest,
  CreateExamResponse,
  TeacherExam,
} from './teacher-dashboard.model';
import { ApiResponse } from '../../../../models/api.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
})
export class TeacherDashboardComponent implements OnInit {
  user$: Observable<User | null>;
  teacherExams: TeacherExam[] = [];
  showNewExamForm = false;
  examForm: FormGroup;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    private teacherActionService: TecherActionService,
    private dialog: MatDialog
  ) {
    this.user$ = this.store.select(selectUser);
    this.examForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      total_marks: [100, [Validators.required, Validators.min(1)]],
      start_time: ['', Validators.required],
      duration_minutes: [60, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.loadExams(user.id);
      }
    });
  }

  loadExams(teacherId: number): void {
    this.teacherActionService.getTeacherExams(teacherId).subscribe({
      next: (response: ApiResponse<TeacherExam[]>) => {
        console.log('🚀 Exams loaded:', response);
        this.teacherExams = response.data;
      },
      error: (error) => {
        console.error('Error loading exams:', error);
      },
    });
  }

  openExamDashboard(examId: number): void {
    this.router.navigate([`/teacher/exam/${examId}`]);
  }

  openLogoutDialog(): void {
    const dialogData: DialogData = {
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      confirmText: 'Logout',
      cancelText: 'Cancel',
    };

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: dialogData,
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.logout();
      }
    });
  }

  private logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

  openNewExamForm(): void {
    this.showNewExamForm = true;
  }

  closeNewExamForm(): void {
    this.showNewExamForm = false;
    this.examForm.reset({
      total_marks: 100,
      duration_minutes: 60,
    });
  }

  createExam(): void {
    if (this.examForm.invalid) {
      return;
    }

    this.user$.subscribe((user) => {
      if (!user) return;

      const examData: CreateExamRequest = {
        ...this.examForm.value,
        teacherId: user.id,
      };

      this.teacherActionService.createExam(examData).subscribe({
        next: (response: ApiResponse<CreateExamResponse>) => {
          console.log(
            '🚀 ~ TeacherDashboardComponent ~ this.teacherActionService.createExam ~ response:',
            response
          );
          this.Toast.fire({
            icon: 'success',
            title: 'Exam created successfully!',
          });
          this.closeNewExamForm();
          this.router.navigate([`/teacher/exam/${response.data.examId}`]);
        },
        error: (error) => {
          console.error('Error creating exam:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error creating exam!',
          });
        },
      });
    });
  }
}
