import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { User } from '../../../../store/types/auth.model';
import { selectUser } from '../../../../store/selectors/auth.selectors';
import { StudentActionService } from '../../services/student-action.service';
import { ApiResponse } from '../../../../models/api.model';
import { ExamDetails, ExamQuestion } from './student-exam-attempt.model';
import { SubmittedAnswer } from '../student-exam-results/student-exam-result.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-exam-attempt',
  imports: [CommonModule],
  templateUrl: './student-exam-attempt.component.html',
  styleUrl: './student-exam-attempt.component.css',
})
export class StudentExamAttemptComponent implements OnInit, OnDestroy {
  user$: Observable<User | null>;
  examId: number = 0;
  examDetails: ExamDetails | null = null;
  examQuestions: ExamQuestion[] = [];
  answers: SubmittedAnswer[] = [];

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  // Timer variables
  remainingTime: number = 0; // Remaining time in seconds
  timerSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentActionService: StudentActionService,
    private store: Store
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.examId = Number(
      this.activatedRoute.parent?.snapshot.paramMap.get('examId')
    );
    console.log('Exam ID: ', this.examId);
    this.loadExamQuestions(this.examId);
  }

  loadExamQuestions(examId: number) {
    this.studentActionService.getCurrentExamQuestions(examId).subscribe({
      next: (
        response: ApiResponse<{
          examDetails: ExamDetails;
          examQuestions: ExamQuestion[];
        }>
      ) => {
        this.examDetails = response.data.examDetails;
        this.examQuestions = response.data.examQuestions;

        // Initialize answer array with default values
        this.answers = this.examQuestions.map((question) => ({
          question_id: question.id,
          selected_option: undefined,
        }));

        console.log('Exam Details:', this.examDetails);
        console.log('Exam Questions:', this.examQuestions);

        // Start timer when exam details are loaded
        this.startTimer(this.examDetails?.duration_minutes ?? 0);
      },
      error: (error) => {
        console.log('Error fetching exam questions:', error);
        this.Toast.fire({
          icon: 'error',
          title: 'Error fetching exam questions. Please try again later.',
        });
        this.router.navigate(['/student']);
      },
    });
  }

  startTimer(duration: number) {
    this.remainingTime = duration * 60; // Convert minutes to seconds

    this.timerSubscription = interval(1000)
      .pipe(takeWhile(() => this.remainingTime > 0))
      .subscribe(() => {
        this.remainingTime--;

        if (this.remainingTime <= 0) {
          console.log('⏳ Time is up! Submitting the exam...');
          this.submitExam();
        }
      });
  }

  formatTime(): string {
    const hours = Math.floor(this.remainingTime / 3600);
    const minutes = Math.floor((this.remainingTime % 3600) / 60);
    const seconds = this.remainingTime % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  selectAnswer(questionId: number, option: 'A' | 'B' | 'C' | 'D' | undefined) {
    const answerIndex = this.answers.findIndex(
      (ans) => ans.question_id === questionId
    );
    if (answerIndex > -1) {
      this.answers[answerIndex] = {
        ...this.answers[answerIndex],
        selected_option: option,
      };
    }
  }

  submitExam() {
    if (this.answers.some((ans) => ans.selected_option === undefined)) {
      console.log('🚨 Please answer all questions before submitting.');
      this.Toast.fire({
        icon: 'error',
        title: 'Please answer all questions before submitting.',
      });
      return;
    }

    console.log('Submitting Exam Answers:', this.answers);

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Stop timer
    }

    this.studentActionService
      .submitExamAnswers(this.examId, this.answers)
      .subscribe({
        next: (response) => {
          console.log('✅ Exam submitted successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'Exam submitted successfully!',
            text: `You scored ${response.data.score} out of ${this.examDetails?.total_marks}.`,
          });
          this.router.navigate([`/student`]);
        },
        error: (error) => {
          console.log('❌ Error submitting exam:', error);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Cleanup timer on component destroy
    }
  }
}
