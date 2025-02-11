import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TeacherActionService } from '../../services/teacher-action.service';
import {
  AddQuestionRequest,
  ExamQuestion,
} from './teacher-exam-questions.model';
import { ApiResponse } from '../../../../models/api.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { User } from '../../../../store/types/auth.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-teacher-exam-questions',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-exam-questions.component.html',
  styleUrl: './teacher-exam-questions.component.css',
})
export class TeacherExamQuestionsComponent implements OnInit {
  user$: Observable<User | null>;
  examId: number = 0;
  examQuestions: ExamQuestion[] = [];
  questionForms: FormGroup[] = [];
  isEditing: boolean[] = [];
  newQuestionForm!: FormGroup;
  userId: number = 0;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  constructor(
    private route: ActivatedRoute,
    private teacherActionService: TeacherActionService,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.user$ = this.store.select(selectUser);
    this.user$.subscribe((user) => {
      if (user) {
        this.userId = user.id;
      }
    });
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      this.examId = Number(params.get('id'));
      if (!isNaN(this.examId) && this.examId > 0) {
        this.getExamQuestions();
      } else {
        console.error('❌ Invalid examId:', this.examId);
      }
    });

    this.initializeNewQuestionForm();
  }

  getExamQuestions() {
    if (this.examId) {
      this.teacherActionService.getExamQuestions(this.examId).subscribe({
        next: (response: ApiResponse<ExamQuestion[]>) => {
          console.log('🚀 Exam Questions Response:', response);
          this.examQuestions = response.data;
          this.initializeQuestionForms();
        },
        error: (error) =>
          console.error('Error fetching exam questions:', error),
      });
    }
  }

  initializeQuestionForms() {
    this.questionForms = this.examQuestions.map(
      (question) =>
        new FormGroup({
          question_text: new FormControl(
            { value: question.question_text, disabled: true },
            Validators.required
          ),
          option_a: new FormControl(
            { value: question.option_a, disabled: true },
            Validators.required
          ),
          option_b: new FormControl(
            { value: question.option_b, disabled: true },
            Validators.required
          ),
          option_c: new FormControl(
            { value: question.option_c, disabled: true },
            Validators.required
          ),
          option_d: new FormControl(
            { value: question.option_d, disabled: true },
            Validators.required
          ),
          correct_option: new FormControl(
            { value: question.correct_option, disabled: true },
            Validators.required
          ),
          difficulty: new FormControl(
            { value: question.difficulty, disabled: true },
            Validators.required
          ),
          image_url: new FormControl({
            value: question.image_url,
            disabled: true,
          }),
        })
    );

    this.isEditing = new Array(this.examQuestions.length).fill(false);
  }

  initializeNewQuestionForm() {
    this.newQuestionForm = this.formBuilder.group({
      question_text: ['', Validators.required],
      option_a: ['', Validators.required],
      option_b: ['', Validators.required],
      option_c: ['', Validators.required],
      option_d: ['', Validators.required],
      correct_option: ['', Validators.required],
      difficulty: ['', Validators.required],
      image_url: [''],
    });
  }

  toggleEdit(index: number) {
    this.isEditing[index] = !this.isEditing[index];

    setTimeout(() => {
      if (this.isEditing[index]) {
        this.questionForms[index].enable();
      } else {
        this.questionForms[index].disable();
      }
    });
  }

  saveQuestion(index: number) {
    const updatedQuestion = this.questionForms[index].value;
    console.log('Saving updated question:', updatedQuestion);
    this.toggleEdit(index);
  }

  addNewQuestion() {
    if (this.newQuestionForm.valid) {
      const newQuestion: AddQuestionRequest = {
        teacherId: this.userId, // Ensure teacher ID is included
        examId: this.examId, // Ensure exam ID is included
        questionText: this.newQuestionForm.value.question_text,
        optionA: this.newQuestionForm.value.option_a,
        optionB: this.newQuestionForm.value.option_b,
        optionC: this.newQuestionForm.value.option_c,
        optionD: this.newQuestionForm.value.option_d,
        correctOption: this.newQuestionForm.value.correct_option,
        difficulty: this.newQuestionForm.value.difficulty,
        imageUrl: this.newQuestionForm.value.image_url || null, // Set null if empty
      };

      console.log('📌 Adding new question:', newQuestion);

      this.teacherActionService.addQuestionToExam(newQuestion).subscribe({
        next: (response: ApiResponse<ExamQuestion[]>) => {
          console.log('✅ Question added successfully:', response);

          // Refresh the question list after adding a new question
          this.getExamQuestions();

          // Reset form after submission
          this.newQuestionForm.reset();
        },
        error: (error) => {
          console.error('❌ Error adding new question:', error);
        },
      });
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Please fill all the fields!',
      });
    }
  }

  onImageUpload(event: any, index: number | 'new') {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    if (index === 'new') {
      this.newQuestionForm.patchValue({ image_url: imageUrl });
    } else {
      this.questionForms[index].patchValue({ image_url: imageUrl });
    }
  }
}
