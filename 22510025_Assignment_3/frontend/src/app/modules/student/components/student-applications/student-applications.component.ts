import { Component, OnInit } from '@angular/core';
import { User } from '../../../../store/types/auth.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { CommonModule } from '@angular/common';
import { StudentActionService } from '../../services/student-action.service';
import {
  EligibleCourse,
  StudentEligibleCoursesResponse,
  StudentCourseApplicationResponse,
} from './student-application.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-applications',
  imports: [CommonModule],
  templateUrl: './student-applications.component.html',
  styleUrl: './student-applications.component.css',
})
export class StudentApplicationsComponent implements OnInit {
  user$: Observable<User | null>;
  eligibleCourses: EligibleCourse[] | null = [];
  studentId: string | null = null;

  constructor(
    private store: Store,
    private studentActionService: StudentActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user?.student_id) {
        this.studentId = user.student_id;
        this.fetchStudentApplications(user.student_id);
      }
    });
  }

  fetchStudentApplications(studentId: string) {
    this.studentActionService.getStudentApplications(studentId).subscribe({
      next: (response: StudentEligibleCoursesResponse) => {
        console.log(
          '🚀 ~ StudentApplicationsComponent ~ fetchStudentApplications ~ response:',
          response
        );

        if (response.data && response.data.length > 0) {
          const semesterOrder: {
            [key in 'Fall' | 'Winter' | 'Spring' | 'Summer']: number;
          } = {
            Fall: 1,
            Winter: 2,
            Spring: 3,
            Summer: 4,
          };

          this.eligibleCourses = response.data.sort((a, b) => {
            const semesterComparison =
              (semesterOrder[a.semester as keyof typeof semesterOrder] || 0) -
              (semesterOrder[b.semester as keyof typeof semesterOrder] || 0);
            if (semesterComparison !== 0) {
              return semesterComparison;
            }
            return a.sec_id.localeCompare(b.sec_id);
          });
        } else {
          this.eligibleCourses = [];
        }

        console.log('Sorted Eligible Courses:', this.eligibleCourses);
      },
      error: (err) => {
        console.error('Error fetching student applications:', err);
        this.eligibleCourses = [];
      },
    });
  }

  applyForCourse(
    courseId: string,
    secId: string,
    semester: string,
    year: number
  ) {
    console.log('Applying for course:', courseId);

    this.user$.subscribe((user) => {
      if (user?.student_id) {
        const studentId = user.student_id;

        this.studentActionService
          .applyForCourse(studentId, courseId, secId, semester, year)
          .subscribe({
            next: (response: StudentCourseApplicationResponse) => {
              console.log(
                '🚀 ~ StudentApplicationsComponent ~ this.user$.subscribe ~ response:',
                response
              );

              Swal.fire({
                title: 'Course Application',
                text: 'You have successfully applied for the course!',
                icon: 'success',
              });

              if (studentId) {
                this.fetchStudentApplications(studentId);
              } else {
                console.error(
                  'Student ID is missing, unable to fetch applications'
                );
              }
            },
            error: (err) => {
              console.error('Error applying for course:', err);

              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              });
            },
          });
      } else {
        // Handle case where student_id is missing
        console.error('Student ID is missing');
        Swal.fire({
          icon: 'error',
          title: 'Invalid User',
          text: 'Student ID is not available.',
        });
      }
    });
  }
}
