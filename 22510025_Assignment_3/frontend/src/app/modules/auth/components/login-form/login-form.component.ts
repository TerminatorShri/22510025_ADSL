import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginResponse } from '../../types/auth.types';
import { User } from '../../../../store/types/auth.model';
import { loginSuccess } from '../../../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  loginForm: FormGroup;
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
    private authService: AuthenticationService,
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
      this.errorMessage = 'Please enter a username and password.';
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

        this.store.dispatch(loginSuccess({ user }));

        const roleId = parseInt(response.data.role_id);

        switch (roleId) {
          case 1:
            this.router.navigate(['/admin']);
            break;
          case 2:
            this.router.navigate(['/hod']);
            break;
          case 3:
            this.router.navigate(['/teacher']);
            break;
          case 4:
            this.router.navigate(['/student']);
            break;
          case 5:
            this.router.navigate(['/registrar']);
            break;
          default:
            this.errorMessage = 'Invalid role';
        }
      },
      error: () => {
        this.errorMessage = 'Invalid username or password.';
      },
    });
  }
}
