import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { TeacherActionService } from '../../services/teacher-action.service';
import {
  StudentMarks,
  CourseWithStudents,
  TeacherRecordsResponse,
} from './teacher-records.model';
import { User } from '../../../../store/types/auth.model';
import { FormsModule } from '@angular/forms';
import { AssignGradesComponent } from '../assign-grades/assign-grades.component';

@Component({
  selector: 'app-teacher-records',
  imports: [CommonModule, FormsModule, AssignGradesComponent],
  templateUrl: './teacher-records.component.html',
  styleUrls: ['./teacher-records.component.css'],
})
export class TeacherRecordsComponent implements OnInit {
  user$: Observable<User | null>;
  teacherRecords: StudentMarks[] = [];
  courses: CourseWithStudents[] = [];
  selectedCourse: CourseWithStudents | null = null;

  constructor(
    private store: Store,
    private teacherActionService: TeacherActionService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user?.instructor_id) {
        this.fetchTeacherRecords(user.instructor_id);
      }
    });
  }

  fetchTeacherRecords(instructorId: string): void {
    this.teacherActionService.getTeacherCourseRecords(instructorId).subscribe({
      next: (response: TeacherRecordsResponse) => {
        console.log(
          '🚀 ~ TeacherRecordsComponent ~ this.teacherActionService.getTeacherCourseRecords ~ response:',
          response
        );
        this.teacherRecords = response.data;
        this.groupAndSortByCourse();
      },
      error: (error) => {
        console.log('Error fetching teacher records:', error);
      },
    });
  }

  // Group and sort the records by course
  groupAndSortByCourse(): void {
    const courseGroups = this.teacherRecords.reduce(
      (acc: Record<string, CourseWithStudents>, record: StudentMarks) => {
        const courseId = record.course_id;
        if (!acc[courseId]) {
          acc[courseId] = {
            course_id: record.course_id,
            course_title: record.course_title,
            semester: record.semester,
            year: record.year,
            sec_id: record.sec_id,
            students: [],
          };
        }
        acc[courseId].students.push(record);
        return acc;
      },
      {}
    );

    // Sort students by student_id and convert the course groups into an array
    this.courses = Object.values(courseGroups).map(
      (course: CourseWithStudents) => ({
        ...course,
        students: course.students.sort((a: StudentMarks, b: StudentMarks) =>
          a.student_id.localeCompare(b.student_id)
        ),
      })
    );
  }

  onCourseSelect(course: CourseWithStudents): void {
    this.selectedCourse = course;
  }

  closeGradeForm(): void {
    this.selectedCourse = null;
  }

  refreshTeacherRecords(): void {
    if (this.user$) {
      this.user$.subscribe((user) => {
        if (user?.instructor_id) {
          this.fetchTeacherRecords(user.instructor_id);
        }
      });
    }
  }
}
