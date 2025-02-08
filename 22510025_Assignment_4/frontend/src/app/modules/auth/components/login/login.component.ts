import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { login } from '../../../../store/actions/auth.actions';
import { AuthActionService } from '../../services/auth-action.service';
import Swal from 'sweetalert2';
import { User } from '../../../../store/types/auth.model';
import { LoginResponse } from './login.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthActionService,
    private router: Router,
    private store: Store
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter your username and password';
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.loginUser(username, password).subscribe({
      next: (response: LoginResponse) => {
        const user: User = response.data;

        this.Toast.fire({
          icon: 'success',
          title: 'Signed in Successfully!',
        });

        this.store.dispatch(login({ user }));

        const role = response.data.role;

        switch (role) {
          case 'teacher':
            this.router.navigate(['/teacher']);
            break;
          case 'student':
            this.router.navigate(['/student']);
            break;
          default:
            this.router.navigate(['/']);
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      },
    });
  }
}
