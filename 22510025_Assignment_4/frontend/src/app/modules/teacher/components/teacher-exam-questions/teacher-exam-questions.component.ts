import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TecherActionService } from '../../services/techer-action.service';
import { ExamQuestion } from './teacher-exam-questions.model';
import { ApiResponse } from '../../../../models/api.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-exam-questions',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-exam-questions.component.html',
  styleUrl: './teacher-exam-questions.component.css',
})
export class TeacherExamQuestionsComponent implements OnInit {
  examId: number = 0;
  examQuestions: ExamQuestion[] = [];
  questionForms: FormGroup[] = [];
  isEditing: boolean[] = [];
  newQuestionForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private teacherActionService: TecherActionService,
    private formBuilder: FormBuilder
  ) {}

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
      console.log('Adding new question:', this.newQuestionForm.value);
      this.newQuestionForm.reset();
    } else {
      console.error('❌ New question form is invalid.');
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
